/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from '@components/ui/Button';
import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from 'react';
import PopupModal from '@components/PopupModal';
import { useAppSelector } from '@stores/store';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '@hooks/socket.hook';
import toast from 'react-hot-toast';

interface Device {
    deviceId: string;
    label: string;
}

const LiveSettings = () => {
    const { user } = useAppSelector((state) => state.user);
    const { socket, isConnected, onStartedLivestream, onError } = useSocket();
    const [livestreamName, setLivestreamName] = useState(`${user?.name}'s Livestream`);
    const [greeting, setGreeting] = useState("Nice to meet you! You're watching my livestream!");
    const [announcement, setAnnouncement] = useState("Welcome to my livestream! Let's have fun!");
    const [videoDevices, setVideoDevices] = useState<Device[]>([]);
    const [audioDevices, setAudioDevices] = useState<Device[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [selectedMicrophone, setSelectedMicrophone] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isDevicesLoaded, setIsDevicesLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

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

    const startCamera = useCallback(
        async (videoDeviceId?: string, audioDeviceId?: string) => {
            try {
                const constraints = {
                    video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
                    audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
                };
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                }
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

            setVideoDevices(videoDevices);
            setAudioDevices(audioDevices);

            if (videoDevices.length > 0) {
                setSelectedVideo((prev) => prev || videoDevices[0].deviceId);
            }
            if (audioDevices.length > 0) {
                setSelectedMicrophone((prev) => prev || audioDevices[0].deviceId);
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

    const handleStartLive = useCallback(() => {
        if (!isDevicesLoaded) {
            toast.error('Devices are still loading, please wait');
            return;
        }
        if (!validate()) return;

        if (socket && isConnected) {
            socket.emit(
                'lt_start',
                {
                    livestreamName,
                    livestreamGreeting: greeting,
                    livestreamAnnouncement: announcement,
                },
                (livestreamId: string | null) => {
                    if (livestreamId) {
                        console.log('Livestream started:', livestreamId);
                        navigate(`/live/host?livestreamId=${livestreamId}`, {
                            state: { selectedVideo, selectedMicrophone },
                        });
                    } else {
                        console.error('Failed to start livestream');
                        toast.error('Failed to start livestream');
                    }
                }
            );
        } else {
            console.error('Socket not connected');
            toast.error('Socket not connected');
        }
    }, [livestreamName, greeting, announcement, isDevicesLoaded, socket, isConnected, navigate, selectedMicrophone, selectedVideo]);

    // Register socket event handlers
    useEffect(() => {
        if (socket) {
            onStartedLivestream(({ livestreamId }) => {
                console.log('Livestream started:', livestreamId);
                navigate(`/live/host?livestreamId=${livestreamId}`, {
                    state: { selectedVideo, selectedMicrophone },
                });
            });

            onError((msg) => {
                console.error('Socket error:', msg);
                toast.error(msg);
            });
        }
    }, [socket, onStartedLivestream, onError, navigate, selectedVideo, selectedMicrophone]);

    useEffect(() => {
        if (isDevicesLoaded && selectedVideo && selectedMicrophone) {
            startCamera(selectedVideo, selectedMicrophone);
        }
    }, [isDevicesLoaded, selectedVideo, selectedMicrophone, startCamera]);

    useEffect(() => {
        checkMediaPermissions();
    }, [checkMediaPermissions]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, [stream]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingX: '10px',
                paddingY: '50px',
                height: '85vh',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'dark.500',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '40%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'dark.500',
                    borderRadius: '10px',
                    padding: '20px',
                    position: 'relative',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: 'white.50',
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                        background: 'inherit',
                        paddingBottom: '10px',
                    }}
                >
                    Edit Live Info
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        paddingY: '32px',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your livestream name"
                        value={livestreamName}
                        onChange={(e) => setLivestreamName(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Greeting
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your greeting message"
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Announcement
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your announcement message"
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Video
                    </Typography>
                    <Select
                        fullWidth
                        value={selectedVideo}
                        onChange={(e) => setSelectedVideo(e.target.value as string)}
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '14px 12px',
                                color: 'white.50',
                            },
                            '& .MuiSelect-icon': {
                                color: 'white.50',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.100',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                        }}
                    >
                        {videoDevices.map((device) => (
                            <MenuItem key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Microphone
                    </Typography>
                    <Select
                        fullWidth
                        value={selectedMicrophone}
                        onChange={(e) => setSelectedMicrophone(e.target.value as string)}
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '14px 12px',
                                color: 'white.50',
                            },
                            '& .MuiSelect-icon': {
                                color: 'white.50',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.100',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                        }}
                    >
                        {audioDevices.map((device) => (
                            <MenuItem key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <CustomButton
                    category="primary"
                    shape="pill"
                    size="small"
                    disableTouchRipple
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 2,
                        paddingTop: '10px',
                    }}
                    onClick={handleStartLive}
                >
                    Start Live
                </CustomButton>

                <PopupModal
                    title="Permission Required"
                    message="Please allow camera and microphone permissions to configure your livestream settings."
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={requestPermissions}
                    stage="permission"
                />
            </Box>
        </Box>
    );
};

export default LiveSettings;

const textFieldSx = {
    '& .MuiInputBase-root': {
        borderRadius: '6px',
        '& fieldset': {
            borderColor: 'white.100',
        },
        '&:hover fieldset': {
            borderColor: 'white.50',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white.50',
            borderWidth: 1,
        },
        '& .MuiInputBase-input': {
            fontSize: { xs: 16, md: 18 },
            padding: { xs: '14px 12px', md: '16px 12px' },
            color: 'white.50',
        },
        '& .MuiInputBase-input::placeholder': {
            color: 'gray.200',
            opacity: 1,
        },
    },
    '& .MuiOutlinedInput-root': {
        padding: 0,
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type="password"]::-ms-reveal, & input[type="password"]::-ms-clear, & input[type="password"]::-webkit-credentials-auto-fill-button': {
        display: 'none',
    },
    '& .MuiInputAdornment-root': {
        marginRight: '12px',
    },
};