import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '@stores/store';
import LiveGuestSection from './mobile/LiveGuestSection';

const LiveGuestMobile = () => {
    const { user } = useAppSelector((state) => state.user);

    if (user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <LiveGuestSection
                stream={null}
                messages={[]}
                viewerCount={0}
                guests={[]}
                onSendMessage={() => { }}
                onNextLive={() => { }}
            />
        </Box>
    );
};

export default LiveGuestMobile;