import { MicOffRounded, MicRounded, MusicNoteRounded, MusicOffRounded, SettingsRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PopupModal from '@components/PopupModal';
import { useNavigate } from 'react-router-dom';

interface LiveScreenHostSectionProps {
    stream: MediaStream | null;
    user: IUser | undefined;
    onEndLive: () => void;
}

const LiveScreenHostSection = ({ stream, user, onEndLive }: LiveScreenHostSectionProps) => {
    const [micOn, setMicOn] = useState(true);
    const [musicOn, setMusicOn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !stream) {
            return;
        }

        // Set the stream as srcObject
        videoElement.srcObject = stream;

        // Attempt to play the video
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.error('Error playing video:', error);
            });
        }

        // Cleanup: Reset srcObject when stream changes or component unmounts
        return () => {
            if (videoElement) {
                videoElement.srcObject = null;
                // Pause the video to prevent AbortError
                videoElement.pause();
            }
        };
    }, [stream]);

    const handleMicClick = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !micOn;
            });
            setMicOn(!micOn);
        }
    };

    const handleMusicClick = () => {
        setMusicOn(!musicOn);
        // Tích hợp nhạc nền sau này
    };

    const handleEndLive = () => {
        setOpenModal(false);
        onEndLive();
        navigate('/live');
    };

    return (
        <Box
            sx={{
                width: '70%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '85%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'dark.500',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            >
                {stream ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                ) : (
                    <Box
                        component={'img'}
                        src={user?.avatar}
                        alt="Placeholder"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '10px',
                        }}
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '15%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: 'dark.500',
                            borderRadius: '10px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.50',
                            gap: '10px',
                            textTransform: 'none',
                        }}
                        onClick={handleMicClick}
                    >
                        {micOn ? <MicRounded /> : <MicOffRounded />}
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'dark.500',
                            borderRadius: '10px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.50',
                            gap: '10px',
                            textTransform: 'none',
                            padding: '0 20px',
                        }}
                        onClick={handleMusicClick}
                    >
                        {musicOn ? <MusicNoteRounded /> : <MusicOffRounded />}
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: 'dark.500',
                            borderRadius: '10px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.50',
                            gap: '10px',
                            textTransform: 'none',
                        }}
                        onClick={() => console.log('Settings clicked')}
                    >
                        <SettingsRounded />
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'red.500',
                            borderRadius: '10px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white.50',
                            gap: '10px',
                            textTransform: 'none',
                            padding: '0 20px',
                        }}
                        onClick={() => setOpenModal(true)}
                    >
                        <Typography fontWeight={600}>End Live</Typography>
                    </Button>
                </Box>
            </Box>

            <PopupModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                stage="warning"
                title="End Live Stream"
                message="Are you sure you want to end the live stream? This action cannot be undone."
                onConfirm={handleEndLive}
            />
        </Box>
    );
};

export default LiveScreenHostSection;