import { Box } from '@mui/material';
import WaitingConnectionCard from './components/WaitingConnectionCard';
import ConnectingCard from './components/ConnectingCard';
import { useEffect, useState, useCallback } from 'react';
import PopupModal from '../../components/PopupModal';

const VideoChat = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('balanced');
    const [selectedGender, setSelectedGender] = useState<string>('both');
    const [startVideoChat, setStartVideoChat] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const startMedia = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                console.log("Local media stream started:", mediaStream);
                setStream(mediaStream);
            })
            .catch((error) => {
                console.error("Error accessing media devices:", error);
                setOpenModal(true);
            });
    }, []);

    useEffect(() => {
        const checkMediaPermissions = async () => {
            try {
                const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
                const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });

                if (cameraPermission.state === 'denied' || microphonePermission.state === 'denied') {
                    console.log('Camera or microphone permission denied');
                    setOpenModal(true);
                } else if (cameraPermission.state === 'granted' && microphonePermission.state === 'granted') {
                    console.log('Camera and microphone permission already granted');
                    startMedia();
                } else {
                    console.log('Camera and microphone permission needs user action');
                    setOpenModal(true);
                }
            } catch (error) {
                console.error('Error checking permissions:', error);
                setOpenModal(true);
            }
        };

        checkMediaPermissions();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                console.log("Stopped media tracks");
            }
        };
    }, [stream, startMedia]);

    const handleCountrySelect = useCallback((country: string) => {
        setSelectedCountry(country);
        console.log('Selected country:', country);
    }, []);

    const handleGenderSelect = useCallback((gender: string) => {
        setSelectedGender(gender);
        console.log('Selected gender:', gender);
    }, []);

    const handleStartVideoChat = useCallback(() => {
        setStartVideoChat(true);
        console.log('Starting video chat');
    }, []);

    const handleEndVideoChat = useCallback(() => {
        setStartVideoChat(false);
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            console.log("Video chat ended, stream stopped");
        }
    }, [stream]);

    const requestPermissions = useCallback(() => {
        setOpenModal(false);
        startMedia();
    }, [startMedia]);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            width: '100%',
            paddingX: '10px',
            paddingY: '50px',
        }}>
            {!startVideoChat && (
                <WaitingConnectionCard
                    handleCountrySelect={handleCountrySelect}
                    handleGenderSelect={handleGenderSelect}
                    handleStartVideoChat={handleStartVideoChat}
                    stream={stream}
                />
            )}
            {startVideoChat && (
                <ConnectingCard
                    selectedCountry={selectedCountry}
                    selectedGender={selectedGender}
                    handleEndVideoChat={handleEndVideoChat}
                    stream={stream}
                />
            )}
            <PopupModal
                title="Permission Required"
                message="Please allow camera and microphone permissions to start video chat."
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={requestPermissions}
                stage="permission"
            />
        </Box>
    );
};

export default VideoChat;