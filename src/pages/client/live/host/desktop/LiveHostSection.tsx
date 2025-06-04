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
    avatars: string[];
    onSendMessage: (message: string) => void;
    onEndLive: () => void;
}

const LiveHostSection = ({ stream, messages, viewerCount, avatars, onSendMessage, onEndLive }: LiveHostSectionProps) => {
    const { user } = useAppSelector((state) => state.user);
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
                height: '80vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            <LiveScreenHostSection
                stream={stream}
                user={user}
                onEndLive={onEndLive}
            />
            <Box
                sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <ViewerHostSection viewerCount={viewerCount} avatars={avatars} />
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
                    <ChatHostSection messages={messages} onSendMessage={onSendMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default LiveHostSection;