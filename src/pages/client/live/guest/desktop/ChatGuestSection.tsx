import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

interface ChatGuestSectionProps {
    messages: ILivestreamMessage[];
    onSendMessage: (message: string) => void;
}

const ChatGuestSection = ({ messages, onSendMessage }: ChatGuestSectionProps) => {
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
                    padding: '10px',
                    gap: '10px',
                    overflowY: 'auto',
                    flex: 1,
                }}
            >
                {messages.map((msg) => (
                    <Box key={msg.livestreamId} sx={{ color: 'white.50' }}>
                        <strong>{msg.type}: </strong>
                        {msg.message}
                    </Box>
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '10px',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    sx={{
                        backgroundColor: 'white.50',
                        borderRadius: '4px',
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
                <IconButton onClick={handleSend}>
                    <Send sx={{ color: 'primary.500' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default ChatGuestSection;