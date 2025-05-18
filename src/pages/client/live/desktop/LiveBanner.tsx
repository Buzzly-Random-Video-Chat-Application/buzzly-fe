import { Box, Button, Typography } from '@mui/material';
import { icons } from '@assets/index';
import InfinityCarousel from './InfinityCarousel';

const LiveBanner = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            width: '100%',
            height: '300px',
            overflow: 'hidden',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }}>
                <Typography variant="h1" mb={3}>
                    Live Now
                </Typography>
                <Typography variant="h3" mb={2}>
                    Viewer, guest, or host
                </Typography>
                <Button
                    sx={{
                        backgroundColor: 'dark.500',
                        color: 'white.50',
                        padding: '10px 20px',
                        textTransform: 'none',
                        fontSize: '24px',
                        fontWeight: 600,
                        borderRadius: '30px',
                        gap: '10px',
                    }}
                    startIcon={<img src={icons.tv} alt="tv" style={{ width: '25px', height: '25px' }} />}
                    onClick={() => window.location.href = '/live/live-settings'}
                >
                    Start Live
                </Button>
            </Box>
            <InfinityCarousel />
        </Box>
    );
};

export default LiveBanner;
