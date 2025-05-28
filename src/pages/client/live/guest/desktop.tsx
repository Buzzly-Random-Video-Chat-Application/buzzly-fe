import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '@stores/store';
import LiveGuestSection from './desktop/LiveGuestSection';
import LiveContent from '../desktop/LiveContent';

const LiveGuestDesktop = () => {
    const { user } = useAppSelector((state) => state.user);

    if (user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingX: '10px',
                paddingY: '50px',
            }}
        >
            <LiveGuestSection
                stream={null}
                messages={[]}
                viewerCount={0}
                guests={[]}
                onSendMessage={() => { }}
                onNextLive={() => { }}
            />
            <LiveContent />
        </Box>
    );
};

export default LiveGuestDesktop;