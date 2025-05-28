import { Box } from '@mui/material';
import LiveBanner from './desktop/LiveBanner';
import LiveContent from './desktop/LiveContent';
import Trending from './desktop/Trending';

const LiveDesktop = ({ livestreams }: { livestreams: ILivestreamListResponse | undefined }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                p: 10,
                gap: 10,
            }}
        >
            <LiveBanner />
            <Trending livestreams={livestreams} />
            <LiveContent livestreams={livestreams} />
        </Box>
    );
};

export default LiveDesktop;