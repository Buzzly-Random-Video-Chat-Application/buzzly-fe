import { MicOffRounded, MicRounded, MusicNoteRounded, MusicOffRounded, SettingsRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import PopupModal from '@components/PopupModal';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

interface LiveScreenHostSectionProps {
    stream: MediaStream | null;
    user: IUser | undefined;
    onEndLive: () => void;
}

const VideoBox = memo(({ stream, user }: { stream: MediaStream | null; user: IUser | undefined }) => {
    return (
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
                    ref={(video) => {
                        if (video) {
                            video.srcObject = stream;
                        }
                    }}
                    autoPlay
                    playsInline
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
    );
});

const LiveScreenHostSection = ({ stream, user, onEndLive }: LiveScreenHostSectionProps) => {
    const [micOn, setMicOn] = useState(true);
    const [musicOn, setMusicOn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

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
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            <VideoBox stream={stream} user={user} />
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