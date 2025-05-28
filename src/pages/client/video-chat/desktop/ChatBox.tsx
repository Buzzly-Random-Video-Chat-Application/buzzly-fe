import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { getUserFlag } from '@utils/userUtils';
import { Send } from '@mui/icons-material';

interface ChatBoxProps {
    sendMessage: (message: string) => void;
    messages: IVideoChatMessage[];
    strangerInfo: IUser | undefined;
}

const ChatBox = ({ sendMessage, messages, strangerInfo }: ChatBoxProps) => {
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
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
                        borderColor: 'white.50',
                        boxShadow: '2px 2px 0px 0px #F5F5F5',
                    }}
                    component={'img'}
                    src={strangerInfo?.avatar}
                    alt={strangerInfo?.name}
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
                        color: 'white.50',
                    }}>
                        {strangerInfo?.name || 'Not provided'}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px',
                    }}>
                        {strangerInfo && <img src={getUserFlag(strangerInfo)} style={{ width: '20px', height: '13px' }} />}
                        <Typography sx={{ fontSize: '10px !important', color: 'white.50' }}>
                            {strangerInfo?.nationality || 'No information'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                ref={chatContainerRef}
                sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    paddingY: '10px',
                    overflowY: 'auto',
                    marginY: '20px',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '3px',
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Box sx={{
                            borderRadius: '10px',
                            padding: '5px 10px',
                            backgroundColor: msg.sender === 'You' ? 'primary.500' : 'white.50',
                            color: 'dark.500',
                            fontSize: '14px',
                        }}>
                            {msg.text}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '5px',
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    sx={{
                        backgroundColor: 'white.50',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' },
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                            '& input': { fontSize: '14px !important', color: 'dark.500' },
                        },
                        '& .MuiInputBase-input': {
                            padding: '5px 10px',
                            height: 'auto',
                        },
                    }}
                />
                <IconButton
                    onClick={handleSendMessage}
                    sx={{ padding: '0px 5px' }}
                >
                    <Send sx={{ color: 'primary.500', width: 32, height: 32 }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatBox;