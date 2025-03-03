import { Box, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../../stores/store';

interface ChatBoxProps {
    sendMessage: (message: string) => void;
    messages: { sender: string; text: string }[];
}

const ChatBox = ({ sendMessage, messages }: ChatBoxProps) => {
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { user } = useAppSelector((state) => state.user);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <Box sx={{
            width: '20vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            borderRadius: '10px',
            paddingX: '10px',
            paddingY: '20px',
            backgroundColor: 'dark.500',
        }}>
            <Box sx={{
                width: '100%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <Box
                    sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        bgcolor: 'primary.500',
                        border: '1px solid',
                        borderColor: 'light.500',
                        boxShadow: '2px 2px 0px 0px #F5F5F5',
                    }}
                    component={'img'}
                    src={user?.avatar}
                    alt={user?.name}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingX: '10px',
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '14px !important',
                        color: 'light.500',
                    }}>
                        {user?.name || 'Not provided'}
                    </Typography>
                    <Typography sx={{
                        fontSize: '12px !important',
                        color: 'light.500',
                    }}>
                        {user?.nationality || 'No information'}
                    </Typography>
                </Box>
            </Box>
            <Box
                onScroll={() => {
                    if (chatContainerRef.current) {
                        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
                        if (scrollTop + clientHeight === scrollHeight) {
                            console.log("Scrolled to bottom");
                        }
                    }
                }}
                ref={chatContainerRef}
                sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    paddingY: '10px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    marginY: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: msg.sender === "You" ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Box sx={{
                            borderRadius: '10px',
                            padding: '10px',
                            backgroundColor: msg.sender === "You" ? 'primary.500' : 'light.500',
                            color: 'dark.500',
                        }}>
                            {msg.text}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{ width: '100%', borderRadius: '10px', mt: '10px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    sx={{
                        backgroundColor: 'light.500',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' },
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                            '& input': { fontSize: '18px !important', color: 'dark.500' },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ChatBox;