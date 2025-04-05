import { Box, Button, TextField, Fade } from '@mui/material';
import React, { useRef, useEffect, useMemo } from 'react';
import { icons } from '../assets';
import { generateAnswer } from '../apis/aiAgentApi';
import BouncingDotsLoader from './BouncingDotsLoader';

const Chatbot = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState<{ sender: string; text: string }[]>([]);
    const [loading, setLoading] = React.useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const popularQuestions = [
        "What is Buzzly?",
        "How to use Buzzly?",
        "Is Buzzly safe?",
        "How do I report a user?"
    ];

    const handleChatbot = () => setOpen(!open);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setMessages(prev => [...prev, { sender: 'user', text: message }]);
        setMessage('');
        setLoading(true);

        try {
            let accumulatedText = "";
            await generateAnswer(message, (chunk) => {
                setLoading(false);
                accumulatedText += chunk;
                setMessages(prev => {
                    if (prev.length > 0 && prev[prev.length - 1].sender === 'agent') {
                        return [...prev.slice(0, -1), { sender: 'agent', text: accumulatedText }];
                    } else {
                        return [...prev, { sender: 'agent', text: accumulatedText }];
                    }
                });
            });
        } catch (error) {
            console.error("Error generating answer:", error);
            setLoading(false);
            setMessages(prev => [...prev, { sender: 'agent', text: 'Sorry, something went wrong. Please try again.' }]);
        }
    };

    const handlePopularQuestionClick = (question: string) => setMessage(question);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const memoizedMessages = useMemo(() => messages, [messages]);

    return (
        <>
            {!open ? (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: { xs: '40px', md: '60px' },
                        height: { xs: '40px', md: '60px' },
                        borderRadius: '50%',
                        backgroundColor: 'primary.500',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.3s',
                        ":hover": { boxShadow: '5px 5px 0px 0px #191A23' },
                    }}
                    onClick={handleChatbot}
                    role="button"
                    aria-label="Open chatbot"
                >
                    <Box
                        sx={{ width: { xs: '20px', md: '35px' }, height: { xs: '20px', md: '35px' } }}
                        component={'img'}
                        src={icons.chatbot}
                        alt={'chatbot'}
                    />
                </Box>
            ) : (
                <Fade in={open} timeout={300}>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            width: { xs: '80vw', md: '24vw' },
                            height: { xs: '70vh', md: '54vh' },
                            backgroundColor: 'white.50',
                            boxShadow: '3px 3px 0px 0px #191A23',
                            borderRadius: '10px',
                            border: '1px solid #191A23',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 1000,
                        }}
                        ref={chatBoxRef}
                    >
                        <Box sx={{
                            backgroundColor: 'primary.500',
                            color: 'dark.500',
                            padding: '10px',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #191A23',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Box>BuzzlAI Assistant</Box>
                            <Button onClick={handleChatbot} sx={{ minWidth: 'auto', padding: '5px', color: 'dark.500' }}>
                                ✕
                            </Button>
                        </Box>

                        <Box sx={{
                            flexGrow: 1,
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                            gap: '10px',
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {popularQuestions.map((question, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        onClick={() => handlePopularQuestionClick(question)}
                                        sx={{
                                            textTransform: 'none',
                                            fontSize: { xs: '12px', md: '14px' },
                                            padding: { xs: '8px', md: '5px' },
                                            minHeight: { xs: '48px', md: 'auto' },
                                            borderRadius: '5px',
                                            bgcolor: 'white.50',
                                            color: 'dark.500',
                                            borderColor: 'dark.500',
                                            '&:hover': { bgcolor: 'dark.500', color: 'white.50', borderColor: 'white.50' },
                                        }}
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </Box>

                            {memoizedMessages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                        alignItems: 'flex-end',
                                        gap: '5px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: msg.sender === 'user' ? 'primary.600' : 'gray.300',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {msg.sender === 'user' ? 'U' : 'AI'}
                                    </Box>
                                    <Box
                                        sx={{
                                            borderRadius: '10px',
                                            padding: '5px 10px',
                                            backgroundColor: msg.sender === 'user' ? 'primary.500' : 'gray.50',
                                            color: 'dark.500',
                                            maxWidth: '75%',
                                            wordWrap: 'break-word',
                                            fontSize: { xs: '12px', md: '14px' },
                                        }}
                                    >
                                        {msg.text}
                                    </Box>
                                </Box>
                            ))}
                            {loading && (
                                <BouncingDotsLoader loading={true} />
                            )}
                            <div ref={messagesEndRef}></div>
                        </Box>

                        <Box sx={{ padding: '10px', borderTop: '1px solid #191A23', display: 'flex' }}>
                            <TextField
                                fullWidth
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                variant="outlined"
                                inputRef={(input) => open && input?.focus()}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '5px',
                                        border: '1px solid #191A23',
                                        backgroundColor: 'white',
                                        fontSize: { xs: '12px', md: '14px' },
                                    },
                                    '& .MuiInputBase-input': { padding: '10px' },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                }}
                                aria-label="Chatbot message input"
                            />
                            <Button
                                onClick={sendMessage}
                                sx={{
                                    marginLeft: '5px',
                                    backgroundColor: 'primary.500',
                                    color: 'dark.500',
                                    borderRadius: '5px',
                                    border: '1px solid #191A23',
                                    textTransform: 'none',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            )}
        </>
    );
};

export default Chatbot;