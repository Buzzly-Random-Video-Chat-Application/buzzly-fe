import { Box } from '@mui/material';
import HostInfo from './HostInfo';
import LiveScreenHostSection from './LiveScreenHostSection';
import ChatHostSection from './ChatHostSection';
import ViewerHostSection from './ViewerHostSection';
import { useAppSelector } from '@stores/store';
import { getUserFlag } from '@utils/userUtils';

interface LiveHostSectionProps {
    stream: MediaStream | null;
    messages: ILivestreamMessage[];
    viewerCount: number;
    guests: ILivestreamGuest[];
    onSendMessage: (message: string) => void;
    onEndLive: () => void;
}

const LiveHostSection = ({ stream, messages, viewerCount, guests, onSendMessage, onEndLive }: LiveHostSectionProps) => {
    const { user } = useAppSelector((state) => state.user);
    const avatars = guests.map((_g, index) => `https://picsum.photos/200/200?random=${index + 1}`);
    const hostInfo = {
        hostName: user?.name || 'Host Name',
        country: 'Viet Nam',
        countryFlag: getUserFlag(user ? user : null),
        rating: 1000,
        avatarSrc: user?.avatar || 'https://picsum.photos/200/200?random=6',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '8px',
                padding: '8px'
            }}
        >
            <LiveScreenHostSection stream={stream} user={user} onEndLive={onEndLive} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <ViewerHostSection viewerCount={viewerCount} avatars={avatars} />
                <Box
                    sx={{
                        display: 'flex',
                        bgcolor: 'dark.700',
                        borderRadius: '8px',
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
                    <ChatHostSection messages={messages} onSendMessage={onSendMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default LiveHostSection;