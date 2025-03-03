import { Box, Button, TextField } from '@mui/material';
import React, { useRef, useEffect } from 'react';
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

    const handleChatbot = () => {
        setOpen(!open);
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: message }]);
        setMessage('');
        setLoading(true);

        let accumulatedText = "";

        await generateAnswer(message, (chunk) => {
            setLoading(false);

            accumulatedText += chunk;
            setMessages(prev => {
                if (prev.length > 0 && prev[prev.length - 1].sender === 'agent') {
                    return [
                        ...prev.slice(0, -1),
                        { sender: 'agent', text: accumulatedText }
                    ];
                } else {
                    return [...prev, { sender: 'agent', text: accumulatedText }];
                }
            });
        });
    };

    const handlePopularQuestionClick = (question: string) => {
        setMessage(question);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <>
            {!open ? (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'primary.500',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.3s',
                        ":hover": {
                            boxShadow: '5px 5px 0px 0px #191A23'
                        }
                    }}
                    onClick={handleChatbot}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '35px',
                            height: '35px',
                        }}
                        component={'img'}
                        src={icons.chatbot}
                        alt={'chatbot'}
                    />
                </Box>
            ) : (
                <Box sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '350px',
                    height: '450px',
                    backgroundColor: 'white.50',
                    boxShadow: '3px 3px 0px 0px #191A23',
                    borderRadius: '10px',
                    border: '1px solid #191A23',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }} ref={chatBoxRef}>
                    {/* Header of ChatBox */}
                    <Box sx={{
                        backgroundColor: 'primary.500',
                        color: 'dark.500',
                        padding: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #191A23',
                        userSelect: 'none',
                    }}>BuzzlAI Assistant</Box>

                    {/* Chat Messages Area */}
                    <Box sx={{
                        flexGrow: 1,
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        gap: '10px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}>
                            {popularQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={() => handlePopularQuestionClick(question)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '14px',
                                        borderRadius: '5px',
                                        bgcolor: 'light.500',
                                        color: 'dark.500',
                                        borderColor: 'light.500',
                                        border: '1px solid',
                                        '&:hover': {
                                            bgcolor: 'dark.500',
                                            color: 'light.500',
                                            borderColor: 'light.500',
                                        },
                                    }}
                                    disableTouchRipple
                                >
                                    {question}
                                </Button>
                            ))}
                        </Box>

                        {messages.map((msg, index) => (
                            <Box key={index} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: msg.sender === "user" ? 'flex-end' : 'flex-start',
                            }}>
                                <Box sx={{
                                    borderRadius: '10px',
                                    padding: '5px 10px',
                                    backgroundColor: msg.sender === "user" ? 'primary.500' : 'gray.50',
                                    color: 'dark.500',
                                    maxWidth: '75%',
                                    marginBottom: '5px',
                                }}>
                                    {msg.text}
                                </Box>
                            </Box>
                        ))}
                        {loading && <BouncingDotsLoader loading={true} />}
                        <div ref={messagesEndRef}></div>
                    </Box>

                    {/* Input area */}
                    <Box sx={{
                        padding: '10px',
                        borderTop: '1px solid #191A23',
                        display: 'flex'
                    }}>
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
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '5px',
                                    border: '1px solid #191A23',
                                    backgroundColor: 'white',
                                    fontSize: '14px',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '10px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                }
                            }}
                        />
                        <Button onClick={sendMessage} sx={{
                            marginLeft: '5px',
                            padding: '5px 10px',
                            backgroundColor: 'primary.500',
                            color: 'dark.500',
                            borderRadius: '5px',
                            border: '1px solid #191A23',
                            textTransform: 'none',
                        }}>Send</Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Chatbot;
