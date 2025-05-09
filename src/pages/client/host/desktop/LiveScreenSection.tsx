import { ArrowForwardRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

interface LiveScreenSectionProps {
    onNextLive: () => void;
}

const LiveScreenSection = ({ onNextLive }: LiveScreenSectionProps) => {
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
                }}
            >
                {/* Placeholder for live stream */}
                <Typography color="white.50">Live Stream Placeholder</Typography>
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

export default LiveScreenSection;