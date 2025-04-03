import { Box, Typography } from '@mui/material';
import { icons } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Building bridges through video connections
            </Typography>
            <Box
                component={'img'}
                src={icons.illustration}
                alt={'logo'}
                sx={{ width: '100%', maxWidth: '300px' }}
            />
            <Typography variant='body2' textAlign="center">
                Our innovative video chat app brings people together from around the world with instant connections.
            </Typography>
            <Button
                shape='round'
                category='contained'
                width='auto'
                size='small'
                onClick={() => navigate('/video-chat')}
            >
                Start Video Chat
            </Button>
        </Box>
    );
};

export default Welcome;