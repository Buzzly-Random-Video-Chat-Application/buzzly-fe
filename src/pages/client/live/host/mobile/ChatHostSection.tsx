import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

interface ChatHostSectionProps {
    messages: ILivestreamMessage[];
    onSendMessage: (message: string) => void;
}

const ChatHostSection = ({ messages = [], onSendMessage }: ChatHostSectionProps) => {
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
                    height: '200px',
                }}
            >
                {messages.map((msg) => (
                    <Box key={msg.livestreamId} sx={{ color: 'white.50', fontSize: '12px' }}>
                        <strong>{msg.type}: </strong>
                        {msg.message}
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
                <IconButton onClick={handleSend}>
                    <Send sx={{ color: 'primary.500', fontSize: '20px' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default ChatHostSection;