import { Box, Typography } from '@mui/material'
import { icons } from '../../../assets'
import Button from '../../../components/ui/Button'
import { useNavigate } from 'react-router-dom';

const ExperienceCard = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingX: '60px', paddingY: '40px', borderRadius: '45px', bgcolor: '#F3F3F3', width: '100%', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'dark.500', boxShadow: '5px 5px 0px 0px #191A23' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '50%', alignItems: 'flex-start' }}>
                <Typography variant='h3'>Let's make your video chat</Typography>
                <Typography variant='body1'>
                    Experience seamless global connections with our
                    cutting-edge video chat app. Whether it’s meeting new
                    friends, or simply exploring diverse cultures, our platform
                    brings people together in real-time. Your journey to
                    meaningful conversations starts here!
                </Typography>
                <Button
                    shape="round"
                    category="primary"
                    width='auto'
                    size='medium'
                    onClick={() => navigate('/video-chat')}
                >
                    Meet someone new
                </Button>
            </Box>
            <Box component={'img'} src={icons.experience} alt={'experience'} />
        </Box>
    )
}

export default ExperienceCard