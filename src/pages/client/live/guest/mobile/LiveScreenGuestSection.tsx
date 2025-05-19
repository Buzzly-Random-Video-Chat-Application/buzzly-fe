import { ArrowForwardRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

interface LiveScreenGuestSectionProps {
    stream: MediaStream | null;
    onNextLive: () => void;
}

const LiveScreenGuestSection = ({ stream, onNextLive }: LiveScreenGuestSectionProps) => {
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

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '60%',
                bgcolor: 'dark.700',
                borderRadius: '8px',
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
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <Typography color="white.50" sx={{ p: '16px' }}>
                    Waiting for host stream...
                </Typography>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    bgcolor: 'dark.500',
                    borderRadius: '8px',
                    p: '4px',
                }}
            >
                <Typography fontSize="12px" color="white.50">
                    Next Live
                </Typography>
                <IconButton sx={{ color: 'white.50' }} onClick={onNextLive}>
                    <ArrowForwardRounded fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default LiveScreenGuestSection;