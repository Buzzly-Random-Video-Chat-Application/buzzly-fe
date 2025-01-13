import { Box, Button, Typography } from '@mui/material'
import { icons } from '../../../assets'

const ExperienceCard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingX: '60px', paddingY: '40px', borderRadius: '45px', bgcolor: '#F3F3F3', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '50%', alignItems: 'flex-start' }}>
                <Typography variant='h3'>Let's make your video chat</Typography>
                <Typography variant='body1'>
                    Experience seamless global connections with our
                    cutting-edge video chat app. Whether it’s meeting new
                    friends, or simply exploring diverse cultures, our platform
                    brings people together in real-time. Your journey to
                    meaningful conversations starts here!
                </Typography>
                <Button sx={{
                    backgroundColor: 'primary.500',
                    color: 'dark.500',
                    paddingX: '30px',
                    paddingY: '15px',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px 0px #191A23',
                    border: '1px solid #191A23',
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    fontSize: '18px',
                    ":hover": {
                        boxShadow: '5px 5px 0px 0px #191A23',
                        transform: 'translateY(-5px)',
                    }
                }}>
                    Meet someone new
                </Button>
            </Box>
            <Box component={'img'} src={icons.experience} alt={'experience'} />
        </Box>
    )
}

export default ExperienceCard