import { Box } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppSelector } from '@stores/store';
import toast from 'react-hot-toast';
import LiveHostSection from './desktop/LiveHostSection';
import LiveSettings from './desktop/LiveSettings';
import { io, Socket } from 'socket.io-client';
import PopUpModal from '@components/PopupModal';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '@apis/userApi';

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

const LiveHostDesktop = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isLiveStarted, setIsLiveStarted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEndLivestreamModal, setOpenEndLivestreamModal] = useState(false);
    const [isDevicesLoaded, setIsDevicesLoaded] = useState(false);
    const [formState, setFormState] = useState<ILivestreamFormState>({
        livestreamName: `${user?.name}'s Livestream`,
        livestreamGreeting: `Nice to meet you! You're watching my livestream!`,
        livestreamAnnouncement: `Welcome to my livestream! Let's have fun!`,
        selectedVideo: '',
        selectedMicrophone: '',
    });
    const [devices, setDevices] = useState<ILivestreamDevices>({ video: [], audio: [] });
    const updateFormState = (updates: Partial<ILivestreamFormState>) => {
        setFormState((prev) => ({ ...prev, ...updates }));
    };
    const socketRef = useRef<Socket | null>(null);
    const [peerConnections, setPeerConnections] = useState<{ [key: string]: { pc: RTCPeerConnection, userId: string } }>({});
    const [livestreamId, setLivestreamId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ILivestreamMessage[]>([]);
    const [guests, setGuests] = useState<ILivestreamGuest[]>([]);
    const [viewerCount, setViewerCount] = useState(0);

    const { data: users } = useGetUsersQuery({});
    const avatars = guests.map((_guest) => {
        const user = users?.results.find((user: IUser) => user.id === _guest.guestUserId);
        return user?.avatar || 'https://res.cloudinary.com/dj8tkuzxz/image/upload/avatar_default_vzd9hu.png';
    });

    const validate = useCallback(() => {
        if (!formState.livestreamName.trim()) {
            toast.error('Please enter a livestream name');
            return false;
        }
        if (!formState.livestreamGreeting.trim()) {
            toast.error('Please enter a greeting message');
            return false;
        }
        if (!formState.livestreamAnnouncement.trim()) {
            toast.error('Please enter an announcement message');
            return false;
        }
        if (!formState.selectedVideo) {
            toast.error('Please select a video device');
            return false;
        }
        if (!formState.selectedMicrophone) {
            toast.error('Please select a microphone device');
            return false;
        }
        return true;
    }, [formState]);

    const startCamera = useCallback(
        async (videoDeviceId?: string, audioDeviceId?: string) => {
            try {
                const constraints = {
                    video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
                    audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
                };
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(mediaStream);
            } catch (error) {
                console.error('Error starting camera:', error);
                setOpenModal(true);
            }
        },
        []
    );

    const fetchDevices = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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

            setDevices({ video: videoDevices, audio: audioDevices });

            if (videoDevices.length > 0) {
                setFormState((prev) => ({ ...prev, selectedVideo: prev.selectedVideo || videoDevices[0].deviceId }));
            }
            if (audioDevices.length > 0) {
                setFormState((prev) => ({ ...prev, selectedMicrophone: prev.selectedMicrophone || audioDevices[0].deviceId }));
            }

            stream.getTracks().forEach((track) => track.stop());
            setIsDevicesLoaded(true);
        } catch (error) {
            console.error('Error fetching devices:', error);
            setOpenModal(true);
        }
    }, []);

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
            setOpenModal(true);
        }
    }, [fetchDevices]);

    const requestPermissions = useCallback(() => {
        setOpenModal(false);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(() => {
                fetchDevices();
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
                setOpenModal(true);
            });
    }, [fetchDevices]);

    useEffect(() => {
        if (isDevicesLoaded && formState.selectedVideo && formState.selectedMicrophone) {
            startCamera(formState.selectedVideo, formState.selectedMicrophone);
        }
    }, [isDevicesLoaded, formState.selectedVideo, formState.selectedMicrophone, startCamera]);

    useEffect(() => {
        const newSocket = io(`${VITE_SOCKET}`, {
            path: '/v1/socket',
            query: { userId: user?.id },
        });

        socketRef.current = newSocket;

        newSocket.emit('livestream:connect');

        newSocket.on('connect', () => {
            console.log('Livestream socket connected:', newSocket.id);
        });


        newSocket.on('livestream:ended', () => {
            toast.success('Ended livestream successfully');

            setOpenEndLivestreamModal(false);
            setIsLiveStarted(false);
            setMessages([]);
            setGuests([]);
            setPeerConnections({});
            setStream(null);
            setLivestreamId(null);

            setTimeout(() => navigate('/live'), 1000);
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [user, navigate]);

    useEffect(() => {
        checkMediaPermissions();
    }, [checkMediaPermissions]);

    // Start Livestream
    const handleStartLive = () => {
        if (validate()) {
            console.log('Starting livestream');
            setIsLiveStarted(true);
            socketRef.current?.emit('livestream:start', {
                livestreamName: formState.livestreamName,
                livestreamGreeting: formState.livestreamGreeting,
                livestreamAnnouncement: formState.livestreamAnnouncement,
            }, (livestreamId: string) => {
                console.log('Livestream started:', livestreamId);
                setLivestreamId(livestreamId);
            });
        }
    }

    // Setup WebRTC
    const setupWebRTC = useCallback(async (socket: Socket, guestUserId: string, guestSocketId: string) => {
        if (peerConnections[guestSocketId]) return;

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'disconnected') {
                socket.emit('livestream:disconnect');
            }
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('host:ice:send', {
                    livestreamId,
                    candidate: event.candidate,
                    to: guestSocketId,
                });
            }
        };

        // Add media tracks (camera/mic) vào peer connection
        if (stream) {
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        }

        // Tạo offer và gửi cho guest
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('host:sdp:send', {
            livestreamId,
            sdp: offer,
            to: guestSocketId,
        });

        setPeerConnections((prev) => ({ ...prev, [guestSocketId]: { pc, userId: guestUserId } }));
        setGuests((prev) => [...prev, { guestUserId, guestSocketId }]);
    }, [livestreamId, peerConnections, stream]);

    // Handle SDP reply from guest (answer)
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('guest:sdp:reply', async ({ sdp, from }) => {
                if (peerConnections[from]?.pc) {
                    await peerConnections[from].pc.setRemoteDescription(new RTCSessionDescription(sdp));
                }
            });
        }
    }, [peerConnections]);

    // Handle Guest Joined
    useEffect(() => {
        if (socketRef.current) {
            const handleGuestJoined = async ({ guestUserId, guestSocketId }: { guestUserId: string, guestSocketId: string }) => {
                console.log('Guest joined to host livestream:', guestUserId, guestSocketId);
                if (socketRef.current) {
                    setupWebRTC(socketRef.current, guestUserId, guestSocketId);
                }
            }
            socketRef.current.on('livestream:joined', handleGuestJoined);

            return () => {
                socketRef.current?.off('livestream:joined', handleGuestJoined);
            };
        }
    }, [setupWebRTC]);

    // Handle ICE candidate reply from guest
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('guest:ice:reply', ({ candidate, from }) => {
                console.log('Guest ICE reply to host:', candidate, from);
                if (peerConnections[from]?.pc) {
                    peerConnections[from]?.pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) =>
                        console.error('Error adding ICE candidate:', err)
                    );
                }
            });
        }
    }, [peerConnections]);

    // Handle guest left
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:left', ({ guestSocketId }: { guestSocketId: string }) => {
                setGuests((prev) => prev.filter((guest) => guest.guestSocketId !== guestSocketId));
                setPeerConnections((prev) => {
                    const newConnections = { ...prev };
                    delete newConnections[guestSocketId];
                    return newConnections;
                });
            });
        }
    }, []);

    // Handle get message
    useEffect(() => {
        const handleMessage = ({ message, type, senderId }: { message: string, type: 'host' | 'guest', senderId: string }) => {
            const senderUsername = users?.results.find((user: IUser) => user.id === senderId)?.name;
            if (senderUsername) {
                setMessages((prev) => [...prev, { message, type, senderUsername }]);
            }
        };

        if (socketRef.current) {
            socketRef.current.on('livestream:get-message', handleMessage);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off('livestream:get-message', handleMessage);
            }
        };
    }, [users]);

    // Handle send message from host
    const sendMessage = useCallback((message: string) => {
        if (!socketRef.current) {
            return;
        }

        if (!livestreamId) {
            return;
        }

        if (!message.trim()) {
            return;
        }

        try {
            console.log('Sending message:', message);
            socketRef.current.emit('livestream:send-message', { livestreamId, message, type: 'host' });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [livestreamId]);

    // Handle host end livestream
    const handleOpenEndLivestreamModal = () => {
        setOpenEndLivestreamModal(true);
    };

    const handleEndLivestream = useCallback(() => {
        if (socketRef.current) {
            console.log('Ending livestream');
            socketRef.current.emit('livestream:end', { livestreamId });
        }
    }, [livestreamId]);

    // Handle get viewer count
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:guest-count', (count: number) => {
                console.log('Viewer count:', count);
                setViewerCount(count);
            });
        }
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:error', (error: string) => {
                console.log('Livestream error:', error);
                toast.error(error);
            });
        }
    }, []);

    return isLiveStarted ? (
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
                avatars={avatars}
                onSendMessage={sendMessage}
                onEndLive={handleOpenEndLivestreamModal}
            />
            <PopUpModal
                open={openEndLivestreamModal}
                onClose={() => setOpenEndLivestreamModal(false)}
                title='End Livestream'
                message='Are you sure you want to end this livestream?'
                onConfirm={handleEndLivestream}
                stage='warning'
            />
        </Box>
    ) : (
        <LiveSettings
            formState={formState}
            setFormState={updateFormState}
            devices={devices}
            openModal={openModal}
            setOpenModal={setOpenModal}
            stream={stream}
            handleStartLive={handleStartLive}
            requestPermissions={requestPermissions}
        />
    );
};

export default LiveHostDesktop;