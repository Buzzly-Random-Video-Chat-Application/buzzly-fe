import { Box } from '@mui/material';
import ViewerGuestSection from './ViewerGuestSection';
import HostInfo from './HostInfo';
import ChatGuestSection from './ChatGuestSection';
import LiveScreenGuestSection from './LiveScreenGuestSection';

interface LiveGuestSectionProps {
    stream: MediaStream | null;
    messages: { id: string; sender: string; content: string; type: string }[];
    viewerCount: number;
    guests: { guestUserId: string; guestSocketId: string }[];
    onSendMessage: (message: string) => void;
    onNextLive: () => void;
}

const LiveGuestSection = ({ stream, messages, viewerCount, guests, onSendMessage, onNextLive }: LiveGuestSectionProps) => {
    // Mock host info (replace with API data later)
    const hostInfo = {
        hostName: 'Host Name',
        country: 'Viet Nam',
        countryFlag: 'https://flagcdn.com/vn.svg',
        rating: 1000,
        avatarSrc: 'https://picsum.photos/200/200?random=6',
    };

    // Convert guest avatars (use guest user data if available)
    const avatars = guests.map((_guest, index) => `https://picsum.photos/200/200?random=${index + 1}`);

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
            <LiveScreenGuestSection stream={stream} onNextLive={onNextLive} />
            <Box
                sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <ViewerGuestSection viewerCount={viewerCount} avatars={avatars} />
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
                    <ChatGuestSection messages={messages} onSendMessage={onSendMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default LiveGuestSection;