import { Box } from '@mui/material';
import ViewerSection from './ViewerSection';
import HostInfo from './HostInfo';
import ChatSection from './ChatSection';
import LiveScreenSection from './LiveScreenSection';

const HostLiveSection = () => {
    // Sample data (replace with API data later)
    const viewerCount = 10;
    const avatars = [...Array(20)].map(
        (_, index) => `https://picsum.photos/200/200?random=${index + 1}`
    );
    const hostInfo = {
        hostName: 'Host Name',
        country: 'Viet Nam',
        countryFlag: 'https://flagcdn.com/vn.svg',
        rating: 1000,
        avatarSrc: 'https://picsum.photos/200/200?random=6',
    };

    const handleSendMessage = (message: string) => {
        console.log('Send message:', message);
        // Integrate with WebSocket or API later
    };

    const handleNextLive = () => {
        console.log('Navigate to next live');
        // Integrate with navigation or API later
    };

    return (
        <Box
            sx={{
                height: '80vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            <LiveScreenSection onNextLive={handleNextLive} />
            <Box
                sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <ViewerSection viewerCount={viewerCount} avatars={avatars} />
                <Box
                    sx={{
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        bgcolor: 'dark.500',
                        borderRadius: '10px',
                    }}
                >
                    <HostInfo
                        hostName={hostInfo.hostName}
                        country={hostInfo.country}
                        countryFlag={hostInfo.countryFlag}
                        rating={hostInfo.rating}
                        avatarSrc={hostInfo.avatarSrc}
                    />
                    <ChatSection onSendMessage={handleSendMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default HostLiveSection;