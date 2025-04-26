import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import ConnectingContainer from './ConnectingContainer';
import { IUser } from '@types/user';

interface IMessage {
    text: string;
    sender: string;
}

interface ConnectingCardProps {
    handleEndVideoChat: () => void;
    handleNextVideoChat: () => void;
    stream: MediaStream | null;
    strangerStream: MediaStream | null;
    messages: IMessage[];
    sendMessage: (message: string) => void;
    strangerInfo: IUser | undefined;
}

const ConnectingCard = ({
    handleEndVideoChat,
    handleNextVideoChat,
    stream,
    strangerStream,
    messages,
    sendMessage,
    strangerInfo,
}: ConnectingCardProps) => {
    const [openCollapse, setOpenCollapse] = useState(false);

    useEffect(() => {
        if (stream !== null && strangerStream !== null) {
            setOpenCollapse(true);
        } else {
            setOpenCollapse(false);
        }
    }, [stream, strangerStream]);

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <ConnectingContainer
                handleEndVideoChat={handleEndVideoChat}
                handleNextVideoChat={handleNextVideoChat}
                myStream={stream}
                strangerStream={strangerStream}
            />
            <Box sx={{
                height: openCollapse ? '40vh' : 0,
                width: '100%',
                transition: 'height 0.3s ease-in-out',
                overflow: 'hidden',
            }}>
                <ChatBox sendMessage={sendMessage} messages={messages} strangerInfo={strangerInfo} />
            </Box>
        </Box>
    );
};

export default ConnectingCard;