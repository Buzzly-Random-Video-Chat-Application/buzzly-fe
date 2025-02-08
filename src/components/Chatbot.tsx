import { Box, Button, TextField } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { icons } from '../assets';

const Chatbot = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const popularQuestions = [
        "What is Buzzly?",
        "How to use Buzzly?",
        "Is Buzzly safe?",
        "How do I report a user?"
    ];

    const handleChatbot = () => {
        setOpen(!open);
    };

    const sendMessage = () => {
        console.log("Sending message:", message);
        setMessage('');
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
                <Box
                    ref={chatBoxRef}
                    sx={{
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
                    }}
                >
                    {/* Header of ChatBox */}
                    <Box sx={{
                        backgroundColor: 'primary.500',
                        color: 'dark.500',
                        padding: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #191A23',
                    }}>
                        BuzzlAI Assistant
                    </Box>
                    {/* Popular Questions Area */}
                    <Box sx={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        overflowY: 'auto', //Make scrollable
                        flexGrow: 1
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
                                    borderColor: '#191A23',
                                    color: 'dark.500',
                                    '&:hover': {
                                        backgroundColor: 'light.500',
                                        borderColor: '#191A23',
                                    },
                                }}
                                disableTouchRipple
                            >
                                {question}
                            </Button>
                        ))}
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