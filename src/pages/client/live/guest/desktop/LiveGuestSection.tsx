import { Box } from '@mui/material';
import ViewerGuestSection from './ViewerGuestSection';
import HostInfo from './HostInfo';
import ChatGuestSection from './ChatGuestSection';
import LiveScreenGuestSection from './LiveScreenGuestSection';
import { getUserCountry, getUserFlag } from '@utils/userUtils';

interface LiveGuestSectionProps {
    stream: MediaStream | null;
    messages: ILivestreamMessage[];
    viewerCount: number;
    avatars: string[];
    onSendMessage: (message: string) => void;
    onNextLive: () => void;
    onLeaveLive: () => void;
    hostUser: IUser | null;
}

const LiveGuestSection = ({ stream, messages, viewerCount, avatars, onSendMessage, onNextLive, onLeaveLive, hostUser }: LiveGuestSectionProps) => {
    // Mock host info (replace with API data later)
    const hostInfo = {
        hostName: hostUser?.name || 'Unknown',
        country: getUserCountry(hostUser),
        countryFlag: getUserFlag(hostUser),
        rating: 100,
        avatarSrc: hostUser?.avatar || 'https://res.cloudinary.com/dj8tkuzxz/image/upload/avatar_default_vzd9hu.png',
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
            <LiveScreenGuestSection stream={stream} onNextLive={onNextLive} onLeaveLive={onLeaveLive} />
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