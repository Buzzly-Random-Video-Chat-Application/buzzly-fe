import { Box, Collapse } from '@mui/material';
import { useState } from 'react';
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
    const [openCollapse] = useState(true);

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: '10px',
            }}
        >
            <ConnectingContainer
                handleEndVideoChat={handleEndVideoChat}
                myStream={stream}
                strangerStream={strangerStream}
            />
            <Collapse
                in={openCollapse}
                sx={{ display: 'flex', height: '100%', transition: 'all 0.3s ease-in-out' }}
                unmountOnExit
            >
                <ChatBox sendMessage={sendMessage} messages={messages} />
            </Collapse>
        </Box>
    );
};

export default ConnectingCard;