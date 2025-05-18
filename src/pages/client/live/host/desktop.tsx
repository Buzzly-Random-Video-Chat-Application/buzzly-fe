/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import LiveHostSection from './desktop/LiveHostSection';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@stores/store';
import { useSocket } from '@hooks/socket.hook';
import toast from 'react-hot-toast';

interface Message {
    id: string;
    sender: string;
    content: string;
    type: string;
}

interface Guest {
    guestUserId: string;
    guestSocketId: string;
}

const LiveHostDesktop = () => {
    const { user } = useAppSelector((state) => state.user);
    const {
        socket,
        isConnected,
        onGuestJoined,
        onGuestLeft,
        onReceiveMessage,
        onHostIceReply,
        onHostSdpReply,
        onEndLivestream,
        onError,
    } = useSocket();
    const location = useLocation();
    const navigate = useNavigate();
    const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
    const [messages, setMessages] = useState<Message[]>([]);
    const [viewerCount, setViewerCount] = useState(0);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const livestreamId = new URLSearchParams(location.search).get('livestreamId');
    const { selectedVideo, selectedMicrophone } = location.state || {};

    // Khởi tạo MediaStream
    useEffect(() => {
        if (!selectedVideo || !selectedMicrophone) {
            console.error('Host: Missing device information', { selectedVideo, selectedMicrophone });
            toast.error('Missing device information');
            navigate('/live');
            return;
        }

        console.log('Host: Starting camera with devices', { selectedVideo, selectedMicrophone });

        let mediaStream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                const constraints = {
                    video: { deviceId: { exact: selectedVideo } },
                    audio: { deviceId: { exact: selectedMicrophone } },
                };
                mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('Host: MediaStream created successfully', mediaStream.id);
                setStream(mediaStream);
            } catch (error) {
                console.error('Host: Error starting camera', error);
                toast.error('Failed to access camera or microphone');
                navigate('/live');
            }
        };

        startCamera();

        return () => {
            if (mediaStream) {
                console.log('Host: Stopping MediaStream');
                mediaStream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, [selectedVideo, selectedMicrophone, navigate]);

    // Xử lý socket và WebRTC events
    useEffect(() => {
        if (!livestreamId) {
            console.error('Host: Invalid livestream ID');
            toast.error('Invalid livestream ID');
            navigate('/live');
            return;
        }

        if (!socket || !isConnected) {
            console.error('Host: Socket not connected', { socket: !!socket, isConnected });
            toast.error('Socket not connected');
            navigate('/live');
            return;
        }

        console.log('Host: Initializing socket events for livestream', livestreamId);

        // Gửi yêu cầu bắt đầu livestream
        onGuestJoined(({ guestUserId, guestSocketId }) => {
            console.log('Host: Guest joined', { guestUserId, guestSocketId });
            setGuests((prev) => [...prev, { guestUserId, guestSocketId }]);
            setViewerCount((prev) => prev + 1);

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
            peerConnectionsRef.current.set(guestSocketId, pc);

            if (stream) {
                console.log('Host: Adding tracks to PeerConnection for guest', guestSocketId);
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });
            } else {
                console.error('Host: Stream not available for guest', guestSocketId);
            }

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('Host: Sending ICE candidate to guest', { guestSocketId, candidate: event.candidate });
                    socket.emit('lt_host-ice:send', {
                        livestreamId,
                        candidate: event.candidate.toJSON(),
                        to: guestSocketId,
                    });
                }
            };

            console.log('Host: Creating SDP offer for guest', guestSocketId);
            pc.createOffer()
                .then((offer) => {
                    console.log('Host: Setting local SDP offer', offer);
                    return pc.setLocalDescription(offer);
                })
                .then(() => {
                    if (pc.localDescription) {
                        console.log('Host: Sending SDP offer to guest', guestSocketId);
                        socket.emit('lt_host-sdp:send', {
                            livestreamId,
                            sdp: pc.localDescription.toJSON(),
                            to: guestSocketId,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Host: Error creating SDP offer for guest', guestSocketId, error);
                });
        });

        onGuestLeft(({ guestUserId, guestSocketId }) => {
            console.log('Guest left:', guestUserId, guestSocketId);
            setGuests((prev) => prev.filter((g) => g.guestSocketId !== guestSocketId));
            setViewerCount((prev) => Math.max(0, prev - 1));

            const pc = peerConnectionsRef.current.get(guestSocketId);
            if (pc) {
                pc.close();
                peerConnectionsRef.current.delete(guestSocketId);
            }
        });

        onReceiveMessage(({ message, type, senderId }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `${senderId}-${Date.now()}`,
                    sender: senderId === user?.id ? user?.name || 'Host' : `Guest-${senderId.slice(0, 5)}`,
                    content: message,
                    type,
                },
            ]);
        });

        onHostIceReply(({ candidate, from }) => {
            console.log('Host: Received ICE candidate from guest', { from, candidate });
            const pc = peerConnectionsRef.current.get(from);
            if (pc) {
                pc.addIceCandidate(new RTCIceCandidate(candidate))
                    .catch((error) => {
                        console.error('Host: Error adding ICE candidate from guest', from, error);
                    });
            } else {
                console.error('Host: No PeerConnection found for guest', from);
            }
        });

        onHostSdpReply(({ sdp, from }) => {
            console.log('Host: Received SDP from guest', { from, sdp });
            const pc = peerConnectionsRef.current.get(from);
            if (pc) {
                pc.setRemoteDescription(new RTCSessionDescription(sdp))
                    .catch((error) => {
                        console.error('Host: Error setting remote SDP from guest', from, error);
                    });
            } else {
                console.error('Host: No PeerConnection found for guest', from);
            }
        });

        onEndLivestream(() => {
            console.log('Livestream ended');
            navigate('/live');
        });

        onError((msg) => {
            console.error('Socket error:', msg);
            toast.error(msg);
        });

        return () => {
            peerConnectionsRef.current.forEach((pc) => pc.close());
            peerConnectionsRef.current.clear();
        };
    }, [useSocket]);

    const handleSendMessage = (message: string) => {
        if (socket && livestreamId) {
            socket.emit('lt_send-message', { livestreamId, message, type: 'host' });
        }
    };

    const handleEndLive = () => {
        if (socket && livestreamId) {
            socket.emit('lt_end-livestream', { livestreamId }, () => {
                navigate('/live');
            });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingX: '10px',
                paddingY: '50px',
            }}
        >
            <LiveHostSection
                stream={stream}
                messages={messages}
                viewerCount={viewerCount}
                guests={guests}
                onSendMessage={handleSendMessage}
                onEndLive={handleEndLive}
            />
        </Box>
    );
};

export default LiveHostDesktop;