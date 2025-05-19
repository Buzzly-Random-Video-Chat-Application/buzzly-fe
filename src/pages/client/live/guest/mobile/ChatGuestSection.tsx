import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useAppSelector } from '@stores/store';

interface ChatGuestSectionProps {
    messages: { id: string; sender: string; content: string; type: string }[];
    onSendMessage: (message: string) => void;
}

const ChatGuestSection = ({ messages, onSendMessage }: ChatGuestSectionProps) => {
    const { user } = useAppSelector((state) => state.user);
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                    padding: '8px',
                    gap: '8px',
                    overflowY: 'auto',
                    flex: 1,
                }}
            >
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{ color: 'white.50', fontSize: '12px' }}>
                        <strong>{msg.sender}: </strong>
                        {msg.content}
                    </Box>
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    padding: '8px',
                    bgcolor: 'dark.500',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={user ? 'Type your message...' : 'Log in to chat'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && user) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    disabled={!user}
                    sx={{
                        bgcolor: 'white.50',
                        borderRadius: '4px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' },
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                            '& input': { fontSize: '12px', color: 'dark.500' },
                        },
                        '& .MuiInputBase-input': {
                            padding: '8px',
                            height: 'auto',
                        },
                    }}
                />
                <IconButton onClick={handleSend} disabled={!user}>
                    <Send sx={{ color: user ? 'primary.500' : 'gray.500', fontSize: '20px' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default ChatGuestSection;