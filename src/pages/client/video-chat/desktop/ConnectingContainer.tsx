import { Box, Button, Typography } from '@mui/material';
import UserOneBox from '../components/UserOneBox';
import UserTwoBox from './UserTwoBox';
import { ArrowForwardRounded } from '@mui/icons-material';

interface ConnectingContainerProps {
    handleEndVideoChat: () => void;
    handleNextVideoChat: () => void;
    myStream: MediaStream | null;
    strangerStream: MediaStream | null;
}

const ConnectingContainer = ({ handleEndVideoChat, handleNextVideoChat, myStream, strangerStream }: ConnectingContainerProps) => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            borderRadius: '10px',
            gap: '10px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                gap: '10px',
            }}>
                <UserOneBox myStream={myStream} />
                <UserTwoBox strangerStream={strangerStream} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        sx={{
                            backgroundColor: 'dark.500',
                            borderRadius: '10px',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'white.50',
                        }}
                        onClick={handleEndVideoChat}
                    >
                        ESC
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography fontWeight={700}>End Video Chat</Typography>
                        <Typography>Press esc key to end video chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}>
                        <Typography fontWeight={700}>Next Video Chat</Typography>
                        <Typography>Press right key to meet others</Typography>
                    </Box>
                    <Button
                        sx={{
                            backgroundColor: 'dark.500',
                            borderRadius: '10px',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'white.50',
                        }}
                        onClick={handleNextVideoChat}
                    >
                        <ArrowForwardRounded fontSize="large" />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ConnectingContainer;