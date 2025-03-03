import { Box, Collapse } from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';
import ChatBox from './ChatBox';
import ConnectingContainer from './ConnectingContainer';

interface ConnectingCardProps {
    selectedCountry: string;
    selectedGender: string;
    handleEndVideoChat: () => void;
    stream: MediaStream | null;
}

interface Message {
    sender: string;
    text: string;
}

const ConnectingCard = ({ handleEndVideoChat, stream }: ConnectingCardProps) => {
    const [openCollapse] = useState(true);
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const strangerVideoRef = useRef<HTMLVideoElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (myVideoRef.current && stream) {
            myVideoRef.current.srcObject = stream;
        }
    }, [stream]);

    const sendMessage = useCallback((message: string) => {
        console.log("Sending message:", message);
        setMessages((prev) => [...prev, { sender: "You", text: message }]);
    }, []);

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: '10px',
        }}>
            <ConnectingContainer
                onEndVideoChat={handleEndVideoChat}
                myVideoRef={myVideoRef}
                strangerVideoRef={strangerVideoRef}
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