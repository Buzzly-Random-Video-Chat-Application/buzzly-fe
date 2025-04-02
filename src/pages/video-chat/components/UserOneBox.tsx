import { Box } from '@mui/material';

interface UserOneBoxProps {
    myStream: MediaStream | null;
}

const UserOneBox = ({ myStream }: UserOneBoxProps) => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            {myStream ? (
                <video
                    ref={(video) => {
                        if (video) {
                            video.srcObject = myStream;
                        }
                    }}
                    autoPlay
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                />
            ) : (
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                    <Box sx={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }} />
                </Box>
            )}
        </Box>
    );
};

export default UserOneBox;