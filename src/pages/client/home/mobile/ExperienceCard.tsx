import { Box, Typography } from '@mui/material';
import { icons } from '../../../../assets';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ExperienceCard = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            borderRadius: '25px',
            bgcolor: '#F3F3F3',
            width: '100%',
            gap: '20px',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '3px 3px 0px 0px #191A23'
        }}>
            <Box component={'img'} src={icons.experience} alt={'experience'} sx={{ width: '100%' }} />
            <Typography variant='h6'>Let's make your video chat</Typography>
            <Typography variant='body2'>
                Experience seamless global connections with our video chat app.
            </Typography>
            <Button
                shape="round"
                category="primary"
                width='auto'
                size='small'
                onClick={() => navigate('/video-chat')}
            >
                Meet someone new
            </Button>
        </Box>
    );
};

export default ExperienceCard;