import { Box, TextField, Typography } from '@mui/material';

const ChatBox = () => {
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
            {/* User Information Section */}
            <Box sx={{
                width: '100%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <Box sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    bgcolor: 'primary.500',
                    border: '1px solid',
                    borderColor: 'light.500',
                    boxShadow: '2px 2px 0px 0px #F5F5F5',
                }} />
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
                    }}>Dev Nguyen</Typography>
                    <Typography sx={{
                        fontSize: '12px !important',
                        color: 'light.500',
                    }}>Vietnam</Typography>
                </Box>
            </Box>
            {/* Chat Section */}
            <Box sx={{
                flexGrow: 1, // Cho phép chiếm hết chiều cao còn lại
                width: '100%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '10px',
                paddingY: '10px',
                overflowY: 'auto', // Để thêm cuộn nếu cần
            }}>
                {/* The chats will be here */}
            </Box>
            {/* Text Field Chat Section */}
            <Box sx={{
                width: '100%',
                borderRadius: '10px',
                mt: '10px',
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message here..."
                    sx={{
                        backgroundColor: 'light.500',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                            '& input': {
                                fontSize: '18px !important',
                                color: 'dark.500',
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ChatBox;
