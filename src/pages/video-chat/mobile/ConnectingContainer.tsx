import { Box, Button } from '@mui/material';
import UserOneBox from '../components/UserOneBox';
import UserTwoBox from '../components/UserTwoBox';
import { ArrowForwardRounded } from '@mui/icons-material';

interface ConnectingContainerProps {
    handleEndVideoChat: () => void;
    myStream: MediaStream | null;
    strangerStream: MediaStream | null;
}

const ConnectingContainer = ({ handleEndVideoChat, myStream, strangerStream }: ConnectingContainerProps) => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: '10px',
            width: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
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
                padding: '10px',
            }}>
                <Button
                    sx={{
                        backgroundColor: 'dark.500',
                        borderRadius: '8px',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        color: 'white.50',
                        fontSize: '14px',
                    }}
                    onClick={handleEndVideoChat}
                >
                    ESC
                </Button>
                <Button sx={{
                    backgroundColor: 'dark.500',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    color: 'white.50',
                }}>
                    <ArrowForwardRounded fontSize="medium" />
                </Button>
            </Box>
        </Box>
    );
};

export default ConnectingContainer;