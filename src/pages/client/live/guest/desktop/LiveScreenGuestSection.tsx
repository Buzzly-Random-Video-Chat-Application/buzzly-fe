import { ArrowForwardRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
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
                    <Typography color="white.50">Waiting for host stream...</Typography>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    height: '15%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <Typography fontWeight={700}>Next Live</Typography>
                    <Typography>Press right key to view others</Typography>
                </Box>
                <Button
                    sx={{
                        backgroundColor: 'dark.500',
                        borderRadius: '10px',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white.50',
                    }}
                    onClick={onNextLive}
                >
                    <ArrowForwardRounded fontSize="large" />
                </Button>
            </Box>
        </Box>
    );
};

export default LiveScreenGuestSection;