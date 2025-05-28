import { Box } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppSelector } from '@stores/store';
import toast from 'react-hot-toast';
import LiveHostSection from './desktop/LiveHostSection';
import LiveSettings from './desktop/LiveSettings';
import { io, Socket } from 'socket.io-client';

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

const LiveHostDesktop = () => {
    const { user } = useAppSelector((state) => state.user);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isLiveStarted, setIsLiveStarted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isDevicesLoaded, setIsDevicesLoaded] = useState(false);
    const [formState, setFormState] = useState<ILivestreamFormState>({
        livestreamName: `${user?.name}'s Livestream`,
        livestreamGreeting: "Nice to meet you! You're watching my livestream!",
        livestreamAnnouncement: "Welcome to my livestream! Let's have fun!",
        selectedVideo: '',
        selectedMicrophone: '',
    });
    const [devices, setDevices] = useState<ILivestreamDevices>({ video: [], audio: [] });
    const updateFormState = (updates: Partial<ILivestreamFormState>) => {
        setFormState((prev) => ({ ...prev, ...updates }));
    };
    const socketRef = useRef<Socket | null>(null);

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
            console.log('Livestream ended');
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [user]);

    useEffect(() => {
        checkMediaPermissions();
    }, [checkMediaPermissions]);

    useEffect(() => {
        return () => {
            if (stream) {
                console.log('Host: Stopping MediaStream');
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, [stream]);

    // Start Livestream
    const handleStartLive = () => {
        if (validate()) {
            setIsLiveStarted(true);
            socketRef.current?.emit('livestream:start', {
                livestreamName: formState.livestreamName,
                livestreamGreeting: formState.livestreamGreeting,
                livestreamAnnouncement: formState.livestreamAnnouncement,
            }, (livestreamId: string) => {
                console.log('Livestream started:', livestreamId);
            });
        }
    }

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:error', (error: string) => {
                console.log('Livestream error:', error);
                toast.error(error);
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

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
                messages={[]}
                viewerCount={0}
                guests={[]}
                onSendMessage={() => { }}
                onEndLive={() => { }}
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