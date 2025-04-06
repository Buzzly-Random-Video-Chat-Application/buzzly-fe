import { Box, Button, Typography } from '@mui/material';
import { icons } from '../../../../assets';
import InfinityCarousel from './InfinityCarousel';

const LiveBanner = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            overflow: 'hidden',
        }}>
            <Typography variant="h2" mb={1}>
                Live Now
            </Typography>
            <Typography variant="h4" mb={4}>
                Viewer, guest, or host
            </Typography>
            <Button sx={{
                backgroundColor: 'dark.500',
                color: 'white.50',
                padding: '5px 20px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '30px',
                gap: '5px',
                mb: 4,
            }} startIcon={<img src={icons.tv} alt="tv" style={{ width: '15px', height: '15px' }} />}>
                Start Live
            </Button>
            <InfinityCarousel />
        </Box>
    );
};

export default LiveBanner;
