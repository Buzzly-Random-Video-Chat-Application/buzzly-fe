/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@stores/store';
import { useSocket } from '@hooks/socket.hook';
import toast from 'react-hot-toast';
import LiveGuestSection from './desktop/LiveGuestSection';
import Trending from '../desktop/Trending';
import LiveContent from '../desktop/LiveContent';

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

const LiveGuestDesktop = () => {
    const { user } = useAppSelector((state) => state.user);
    const { socket, isConnected, onReceiveMessage, onHostIceReply, onHostSdpReply, onEndLivestream, onError } = useSocket();
    const location = useLocation();
    const navigate = useNavigate();
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [viewerCount] = useState(0);
    const [guests] = useState<Guest[]>([]);
    const [isJoining, setIsJoining] = useState(false);
    const livestreamId = new URLSearchParams(location.search).get('livestreamId');

    // Kiểm tra livestreamId
    useEffect(() => {
        if (!livestreamId) {
            toast.error('Invalid livestream ID');
            navigate('/live');
        }
    }, [livestreamId, navigate]);

    // Initialize WebRTC and join livestream when socket is connected
    useEffect(() => {
        if (!livestreamId || !socket || !isConnected) {
            console.log('Guest: Waiting for socket connection', { livestreamId, socket: !!socket, isConnected });
            return;
        }

        console.log('Guest: Initializing WebRTC for livestream', livestreamId);

        // Initialize WebRTC peer connection
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        peerConnectionRef.current = pc;

        // Handle incoming tracks from the host
        pc.ontrack = (event) => {
            console.log('Guest: Received track from host', event.streams.length, event.streams[0].id);
            const remoteStream = event.streams[0];
            setStream(remoteStream);
        };

        // Send ICE candidates to the host
        pc.onicecandidate = (event) => {
            if (event.candidate && socket) {
                console.log('Guest: Sending ICE candidate to host', event.candidate);
                socket.emit('lt_ice:reply', {
                    livestreamId,
                    candidate: event.candidate.toJSON(),
                    to: 'host',
                });
            }
        };

        // Join the livestream with timeout
        const joinLivestream = (): Promise<{ success: boolean; message: string }> =>
            new Promise((resolve, reject) => {
                console.log('Guest: Sending lt_join', livestreamId);
                const timeout = setTimeout(() => {
                    console.error('Guest: Join livestream timed out');
                    reject(new Error('Join livestream timed out'));
                }, 10000);

                socket.emit('lt_join', { livestreamId }, (response: { success: boolean; message: string }) => {
                    console.log('Guest: Received lt_join response', response);
                    clearTimeout(timeout);
                    resolve(response);
                });
            });

        setIsJoining(true);
        joinLivestream()
            .then((response) => {
                console.log('Guest: Join livestream response', response);
                if (!response.success) {
                    console.error('Guest: Failed to join livestream', response.message);
                    toast.error(response.message);
                    navigate('/live');
                }
            })
            .catch((error) => {
                console.error('Guest: Error joining livestream', error.message);
                toast.error(error.message);
                navigate('/live');
            })
            .finally(() => {
                console.log('Guest: Join process completed');
                toast.success('Joined livestream successfully');
                setIsJoining(false);
            });

        // Register socket event handlers
        onHostSdpReply(({ sdp, from }) => {
            console.log('Guest: Received SDP from host', { from, sdp });
            if (from === 'host' && pc.signalingState !== 'closed') {
                pc.setRemoteDescription(new RTCSessionDescription(sdp))
                    .then(() => {
                        console.log('Guest: Set remote SDP successfully');
                        if (sdp.type === 'offer') {
                            return pc.createAnswer().then((answer) => {
                                console.log('Guest: Created SDP answer', answer);
                                pc.setLocalDescription(answer);
                                socket.emit('lt_sdp:reply', {
                                    livestreamId,
                                    sdp: answer,
                                    to: 'host',
                                });
                                console.log('Guest: Sent SDP answer to host');
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Guest: Error handling SDP from host', error);
                    });
            }
        });

        onHostIceReply(({ candidate, from }) => {
            console.log('Guest: Received ICE candidate from host', { from, candidate });
            if (from === 'host' && pc.signalingState !== 'closed') {
                pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
                    console.error('Guest: Error adding ICE candidate from host', error);
                });
            }
        });

        onReceiveMessage(({ message, type, senderId }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `${senderId}-${Date.now()}`,
                    sender: senderId === user?.id ? user?.name || 'Guest' : `User-${senderId.slice(0, 5)}`,
                    content: message,
                    type,
                },
            ]);
        });

        onEndLivestream(() => {
            toast.success('Livestream ended by host');
            navigate('/live');
        });

        onError((msg) => {
            console.error('Socket error:', msg);
            toast.error(msg);
            navigate('/live');
        });

        // Cleanup
        return () => {
            if (pc) {
                pc.close();
                peerConnectionRef.current = null;
            }
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, [livestreamId, socket, isConnected]);

    // Handle sending messages
    const handleSendMessage = (message: string) => {
        if (socket && livestreamId && isConnected) {
            socket.emit('lt_send-message', { livestreamId, message, type: 'guest' });
        } else {
            toast.error('Cannot send message: Socket not connected');
        }
    };

    // Handle navigating to the next livestream
    const handleNextLive = () => {
        if (socket && livestreamId && isConnected) {
            socket.emit('lt_next-livestream', { livestreamId }, (nextLivestreamId: string | null) => {
                if (nextLivestreamId) {
                    navigate(`/live/guest?livestreamId=${nextLivestreamId}`);
                } else {
                    toast.error('No more livestreams available');
                }
            });
        } else {
            toast.error('Cannot switch livestream: Socket not connected');
        }
    };

    // Hiển thị thông báo khi socket đang kết nối
    useEffect(() => {
        if (!isConnected && socket) {
            toast.loading('Connecting to server...', { id: 'socket-connecting' });
        } else {
            toast.dismiss('socket-connecting');
        }
    }, [isConnected, socket]);

    // Hiển thị loading khi đang tham gia livestream
    if (isJoining) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    console.log('stream: ', stream);

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
            <LiveGuestSection
                stream={stream}
                messages={messages}
                viewerCount={viewerCount}
                guests={guests}
                onSendMessage={handleSendMessage}
                onNextLive={handleNextLive}
            />
            <Trending />
            <LiveContent />
        </Box>
    );
};

export default LiveGuestDesktop;