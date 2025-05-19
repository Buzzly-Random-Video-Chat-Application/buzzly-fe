import { MicOffRounded, MicRounded, MusicNoteRounded, MusicOffRounded, SettingsRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PopupModal from '@components/PopupModal';

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

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !stream) {
            return;
        }

        videoElement.srcObject = stream;
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.error('Error playing video:', error);
            });
        }

        return () => {
            if (videoElement) {
                videoElement.srcObject = null;
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
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            {stream ? (
                <video
                    ref={videoRef}
                    autoPlay
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
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                />
            )}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                <IconButton
                    sx={{ bgcolor: 'dark.500', color: 'white.50' }}
                    onClick={handleMicClick}
                >
                    {micOn ? <MicRounded fontSize="small" /> : <MicOffRounded fontSize="small" />}
                </IconButton>
                <IconButton
                    sx={{ bgcolor: 'dark.500', color: 'white.50' }}
                    onClick={handleMusicClick}
                >
                    {musicOn ? <MusicNoteRounded fontSize="small" /> : <MusicOffRounded fontSize="small" />}
                </IconButton>
                <IconButton
                    sx={{ bgcolor: 'dark.500', color: 'white.50' }}
                    onClick={() => console.log('Settings clicked')}
                >
                    <SettingsRounded fontSize="small" />
                </IconButton>
                <IconButton
                    sx={{ bgcolor: 'red.500', color: 'white.50' }}
                    onClick={() => setOpenModal(true)}
                >
                    <Typography fontSize="12px" fontWeight={600}>
                        End
                    </Typography>
                </IconButton>
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