/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import { useEffect, useRef, useCallback, useState } from 'react';
import { useAppSelector } from '@stores/store';
import { useSocket } from '@hooks/socket.hook';
import toast from 'react-hot-toast';
import LiveHostSection from './mobile/LiveHostSection';
import LiveSettings from './mobile/LiveSettings';

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

interface Device {
    deviceId: string;
    label: string;
}

const LiveHostMobile = () => {
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
        onStartedLivestream,
        emitLtStart,
    } = useSocket();
    const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
    const videoRef = useRef<HTMLVideoElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [viewerCount, setViewerCount] = useState(0);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [livestreamId, setLivestreamId] = useState<string | null>(null);
    const [isLiveStarted, setIsLiveStarted] = useState(false);
    const [livestreamName, setLivestreamName] = useState(`${user?.name}'s Livestream`);
    const [greeting, setGreeting] = useState("Nice to meet you! You're watching my livestream!");
    const [announcement, setAnnouncement] = useState("Welcome to my livestream! Let's have fun!");
    const [videoDevices, setVideoDevices] = useState<Device[]>([]);
    const [audioDevices, setAudioDevices] = useState<Device[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [selectedMicrophone, setSelectedMicrophone] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [isDevicesLoaded, setIsDevicesLoaded] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // Validate inputs
    const validate = useCallback(() => {
        if (!livestreamName.trim()) {
            toast.error('Please enter a livestream name');
            return false;
        }
        if (!greeting.trim()) {
            toast.error('Please enter a greeting message');
            return false;
        }
        if (!announcement.trim()) {
            toast.error('Please enter an announcement message');
            return false;
        }
        if (!selectedVideo) {
            toast.error('Please select a video device');
            return false;
        }
        if (!selectedMicrophone) {
            toast.error('Please select a microphone device');
            return false;
        }
        return true;
    }, [livestreamName, greeting, announcement, selectedVideo, selectedMicrophone]);

    // Fetch media devices
    const fetchDevices = useCallback(async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices
                .filter((device) => device.kind === 'videoinput')
                .map((device) => ({
                    deviceId: device.deviceId,
                    label: device.label || `Camera ${device.deviceId.slice(0, 5)}`,
                }));
            const audioDevices = devices
                .filter((device) => device.kind === 'audioinput')
                .map((device) => ({
                    deviceId: device.deviceId,
                    label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
                }));

            setVideoDevices(videoDevices);
            setAudioDevices(audioDevices);

            if (videoDevices.length > 0) {
                setSelectedVideo((prev) => prev || videoDevices[0].deviceId);
            }
            if (audioDevices.length > 0) {
                setSelectedMicrophone((prev) => prev || audioDevices[0].deviceId);
            }

            setIsDevicesLoaded(true);
        } catch (error) {
            console.error('Error fetching devices:', error);
            toast.error('Failed to fetch media devices');
            setOpenModal(true);
        }
    }, []);

    // Check media permissions
    const checkMediaPermissions = useCallback(async () => {
        try {
            const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
            const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });

            if (cameraPermission.state === 'denied' || microphonePermission.state === 'denied') {
                setOpenModal(true);
            } else if (cameraPermission.state === 'granted' && microphonePermission.state === 'granted') {
                await fetchDevices();
            } else {
                setOpenModal(true);
            }
        } catch (error) {
            console.error('Error checking permissions:', error);
            toast.error('Error checking media permissions');
            setOpenModal(true);
        }
    }, [fetchDevices]);

    // Request permissions
    const requestPermissions = useCallback(() => {
        setOpenModal(false);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                stream.getTracks().forEach((track) => track.stop());
                fetchDevices();
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
                toast.error('Failed to access media devices');
                setOpenModal(true);
            });
    }, [fetchDevices]);

    // Start camera
    const startCamera = useCallback(async (videoDeviceId?: string, audioDeviceId?: string) => {
        try {
            const constraints = {
                video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
                audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
            };
            console.log('Host: getUserMedia constraints', constraints);
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            const tracks = mediaStream.getTracks();
            console.log('Host: MediaStream obtained', {
                streamId: mediaStream.id,
                active: mediaStream.active,
                tracks: tracks.map((track) => ({
                    kind: track.kind,
                    id: track.id,
                    enabled: track.enabled,
                    readyState: track.readyState,
                })),
            });

            if (!mediaStream.active || tracks.length === 0) {
                throw new Error('No active tracks in media stream');
            }
            if (!tracks.some((track) => track.kind === 'video' && track.readyState === 'live')) {
                throw new Error('No live video track available');
            }

            setStream(mediaStream);
            console.log('Host: Stream assigned to streamRef', {
                id: mediaStream.id,
                active: mediaStream.active,
            });

            // Assign stream to videoRef
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Host: Error starting camera', error);
            toast.error('Failed to start camera');
            setOpenModal(true);
        }
    }, []);

    // Start camera when devices are loaded
    useEffect(() => {
        if (isDevicesLoaded && selectedVideo && selectedMicrophone) {
            console.log('Host: Starting camera with devices', { selectedVideo, selectedMicrophone });
            startCamera(selectedVideo, selectedMicrophone);
        }
    }, [isDevicesLoaded, selectedVideo, selectedMicrophone, startCamera]);

    // Check permissions on mount
    useEffect(() => {
        checkMediaPermissions();
    }, [checkMediaPermissions]);

    // Handle send message
    const handleSendMessage = (message: string) => {
        if (socket && livestreamId) {
            socket.emit('send:message', { livestreamId, message, type: 'host' });
        }
    };

    // Handle end livestream
    const handleEndLive = () => {
        if (socket && livestreamId) {
            socket.emit('end:livestream', { livestreamId });
        }
    };

    // Socket and WebRTC events
    useEffect(() => {
        if (!socket || !isConnected || !isLiveStarted || !livestreamId) {
            return;
        }

        console.log('Host: Initializing socket events for livestream', livestreamId);

        onGuestJoined(async ({ guestUserId, guestSocketId }) => {
            console.log('Host: Guest joined', { guestUserId, guestSocketId });
            setGuests((prev) => [...prev, { guestUserId, guestSocketId }]);
            setViewerCount((prev) => prev + 1);

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
            peerConnectionsRef.current.set(guestSocketId, pc);

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('Host: Sending ICE candidate to guest', { guestSocketId, candidate: event.candidate });
                    socket.emit('host:ice:send', {
                        livestreamId,
                        candidate: event.candidate,
                        to: guestSocketId,
                    });
                }
            };

            try {
                // Stop existing stream if any
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                    setStream(null);
                }

                // Create new stream for WebRTC
                const constraints = {
                    video: selectedVideo ? { deviceId: { exact: selectedVideo } } : true,
                    audio: selectedMicrophone ? { deviceId: { exact: selectedMicrophone } } : true,
                };
                console.log('Host: getUserMedia constraints for WebRTC', constraints);
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                const tracks = mediaStream.getTracks();
                console.log('Host: MediaStream obtained for WebRTC', {
                    streamId: mediaStream.id,
                    active: mediaStream.active,
                    tracks: tracks.map((track) => ({
                        kind: track.kind,
                        id: track.id,
                        enabled: track.enabled,
                        readyState: track.readyState,
                    })),
                });

                if (!mediaStream.active || tracks.length === 0) {
                    throw new Error('No active tracks in media stream');
                }
                if (!tracks.some((track) => track.kind === 'video' && track.readyState === 'live')) {
                    throw new Error('No live video track available');
                }

                setStream(mediaStream);
                console.log('Host: Stream assigned to streamRef for WebRTC', {
                    id: mediaStream.id,
                    active: mediaStream.active,
                });

                // Assign stream to videoRef
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }

                // Add tracks to PeerConnection
                mediaStream.getTracks().forEach((track) => {
                    console.log('Host: Adding track to PeerConnection', { trackId: track.id, guestSocketId });
                    pc.addTrack(track, mediaStream);
                });

                console.log('Host: Creating SDP offer for guest', guestSocketId);
                pc.createOffer()
                    .then((offer) => {
                        console.log('Host: Setting local SDP offer', offer);
                        return pc.setLocalDescription(offer);
                    })
                    .then(() => {
                        if (pc.localDescription) {
                            console.log('Host: Sending SDP offer to guest', guestSocketId);
                            socket.emit('host:sdp:send', {
                                livestreamId,
                                sdp: pc.localDescription,
                                to: guestSocketId,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Host: Error creating SDP offer for guest', guestSocketId, error);
                    });
            } catch (error) {
                console.error('Host: Error setting up WebRTC for guest', guestSocketId, error);
                toast.error('Failed to set up WebRTC for guest');
                setOpenModal(true);
            }
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
                pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
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
                pc.setRemoteDescription(new RTCSessionDescription(sdp)).catch((error) => {
                    console.error('Host: Error setting remote SDP from guest', from, error);
                });
            } else {
                console.error('Host: No PeerConnection found for guest', from);
            }
        });

        onEndLivestream(() => {
            console.log('Livestream ended');
            setIsLiveStarted(false);
            setLivestreamId(null);
            setGuests([]);
            setViewerCount(0);
            setMessages([]);
            peerConnectionsRef.current.forEach((pc) => pc.close());
            peerConnectionsRef.current.clear();
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        });

        onError((msg) => {
            console.error('Socket error:', msg);
            toast.error(msg);
        });

        onStartedLivestream(({ livestreamId }) => {
            console.log('Livestream started:', livestreamId);
            setLivestreamId(livestreamId);
            setIsLiveStarted(true);
        });

        return () => {
            peerConnectionsRef.current.forEach((pc) => pc.close());
            peerConnectionsRef.current.clear();
        };
    }, [
        socket,
        isConnected,
        isLiveStarted,
        livestreamId,
        selectedVideo,
        selectedMicrophone,
        onGuestJoined,
        onGuestLeft,
        onReceiveMessage,
        onHostIceReply,
        onHostSdpReply,
        onEndLivestream,
        onError,
        onStartedLivestream,
        user,
    ]);

    // Start livestream
    const handleStartLive = useCallback(() => {
        if (!isDevicesLoaded) {
            toast.error('Devices are still loading, please wait');
            return;
        }
        if (!validate()) return;

        if (socket && isConnected) {
            emitLtStart(livestreamName, greeting, announcement, (livestreamId: string | null) => {
                if (livestreamId) {
                    console.log('Livestream started:', livestreamId);
                    setLivestreamId(livestreamId);
                    setIsLiveStarted(true);
                } else {
                    console.error('Failed to start livestream');
                    toast.error('Failed to start livestream');
                }
            });
        } else {
            console.error('Socket not connected');
            toast.error('Error starting livestream!');
        }
    }, [livestreamName, greeting, announcement, isDevicesLoaded, socket, isConnected, emitLtStart]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    return isLiveStarted ? (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <LiveHostSection
                stream={stream}
                messages={messages}
                viewerCount={viewerCount}
                guests={guests}
                onSendMessage={handleSendMessage}
                onEndLive={handleEndLive}
            />
        </Box>
    ) : (
        <LiveSettings
            livestreamName={livestreamName}
            setLivestreamName={setLivestreamName}
            greeting={greeting}
            setGreeting={setGreeting}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            videoDevices={videoDevices}
            audioDevices={audioDevices}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            selectedMicrophone={selectedMicrophone}
            setSelectedMicrophone={setSelectedMicrophone}
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleStartLive={handleStartLive}
            requestPermissions={requestPermissions}
            stream={stream}
        />
    );
};

export default LiveHostMobile;