import { Box } from '@mui/material';
import ChatBox from './ChatBox';
import ConnectingContainer from './ConnectingContainer';

interface IMessage {
    text: string;
    sender: string;
}

interface ConnectingCardProps {
    handleEndVideoChat: () => void;
    stream: MediaStream | null;
    strangerStream: MediaStream | null;
    messages: IMessage[];
    sendMessage: (message: string) => void;
}

const ConnectingCard = ({
    handleEndVideoChat,
    stream,
    strangerStream,
    messages,
    sendMessage,
}: ConnectingCardProps) => {

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        }}>
            <ConnectingContainer
                handleEndVideoChat={handleEndVideoChat}
                myStream={stream}
                strangerStream={strangerStream}
            />
            <ChatBox sendMessage={sendMessage} messages={messages} />
        </Box>
    );
};

export default ConnectingCard;