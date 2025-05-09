import { Avatar, Box, Typography } from '@mui/material';
import { RemoveRedEyeRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface LiveCardProps {
    viewers: number;
    username: string;
    country: string;
    image: string;
}

const LiveCard = ({ viewers, username, country, image }: LiveCardProps) => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '300px',
            minWidth: '200px',
            aspectRatio: '2 / 3',
            cursor: 'pointer',
        }} onClick={() => navigate('/live/host?roomId=123456')}>
            <Box
                component="img"
                src={image}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'white.50',
                    bgcolor: 'black.100',
                    padding: '2px 6px',
                    borderRadius: '30px',
                }}
            >
                <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '12px !important' }} />
                <Typography sx={{ fontSize: '12px !important', fontWeight: 600 }}>{viewers}</Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'white.50',
                }}
            >
                <Typography sx={{ fontSize: '12px !important', fontWeight: 600 }}>
                    Live of {username}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src={image}
                        sx={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Typography sx={{ fontSize: '12px !important', fontWeight: 600 }}>
                            {username}
                        </Typography>
                        <img
                            src={country}
                            alt="country flag"
                            style={{ width: '12px', height: '12px' }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LiveCard;