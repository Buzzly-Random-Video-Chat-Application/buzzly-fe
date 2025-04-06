import { Avatar, Box, Typography } from '@mui/material';
import { RemoveRedEyeRounded } from '@mui/icons-material';

interface LiveCardProps {
    viewers: number;
    username: string;
    country: string;
    image: string;
}

const LiveCard = ({ viewers, username, country, image }: LiveCardProps) => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '300px',
            width: '200px',
            transition: 'all 0.5s',
            cursor: 'pointer',
        }}>
            <Box component={'img'} src={image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
            <Box sx={{
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
                padding: '0px 8px',
                borderRadius: '30px',
            }}>
                <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                <Box sx={{ fontSize: '15px' }}>{viewers}</Box>
            </Box>
            <Box sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                display: 'flex',
                flexDirection: 'column',
                color: 'white.50',
            }}>
                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {username}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    alignItems: 'center',
                }}>
                    <Avatar src={image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        alignItems: 'flex-start',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{username}</Typography>
                        <img src={country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LiveCard;
