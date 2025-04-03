import { Box, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../../stores/store';
import { IMessage } from '../../../types/app';

interface ChatBoxProps {
    sendMessage: (message: string) => void;
    messages: IMessage[];
}

const ChatBox = ({ sendMessage, messages }: ChatBoxProps) => {
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { user } = useAppSelector((state) => state.user);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '40vh',
            borderRadius: '10px',
            padding: '10px',
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
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        bgcolor: 'primary.500',
                        border: '1px solid',
                        borderColor: 'white.50',
                        boxShadow: '2px 2px 0px 0px #F5F5F5',
                    }}
                    component={'img'}
                    src={user?.avatar}
                    alt={user?.name}
                />
                <Box sx={{ paddingX: '5px' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '12px !important', color: 'white.50' }}>
                        {user?.name || 'Not provided'}
                    </Typography>
                    <Typography sx={{ fontSize: '10px !important', color: 'white.50' }}>
                        {user?.nationality || 'No information'}
                    </Typography>
                </Box>
            </Box>
            <Box
                ref={chatContainerRef}
                sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    paddingY: '5px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    marginY: '5px',
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Box sx={{
                            borderRadius: '8px',
                            padding: '8px',
                            backgroundColor: msg.sender === 'You' ? 'primary.500' : 'white.50',
                            color: 'dark.500',
                            maxWidth: '70%',
                            fontSize: '14px',
                        }}>
                            {msg.text}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{ width: '100%', borderRadius: '10px' }}>
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
                    }}
                />
            </Box>
        </Box>
    );
};

export default ChatBox;