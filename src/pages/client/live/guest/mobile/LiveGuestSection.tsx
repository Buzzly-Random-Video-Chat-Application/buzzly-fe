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
    const hostInfo = {
        hostName: 'Host Name',
        country: 'Viet Nam',
        countryFlag: 'https://flagcdn.com/vn.svg',
        rating: 1000,
        avatarSrc: 'https://picsum.photos/200/200?random=6',
    };

    const avatars = guests.map((_guest, index) => `https://picsum.photos/200/200?random=${index + 1}`);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100vh',
                bgcolor: 'dark.500',
                gap: '8px',
            }}
        >
            <LiveScreenGuestSection stream={stream} onNextLive={onNextLive} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
                <ViewerGuestSection viewerCount={viewerCount} avatars={avatars} />
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: 'dark.700',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
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