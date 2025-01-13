import { Box, Button, Typography } from '@mui/material'
import { icons } from '../../../assets'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: 'auto', gap: '50px' }}>
            <Box sx={{ width: '60%', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '35px' }}>
                <Typography variant='h1'>Building bridges<br />through video<br />connections</Typography>
                <Typography variant='body1'>Our innovative video chat app brings people<br />together from around the world, offering instant<br />connections, engaging conversations, and<br />memorable interactions through advanced<br />technology and user-friendly features.</Typography>
                <Button sx={{ textTransform: 'none', padding: '15px 35px', borderRadius: '16px', backgroundColor: 'primary.500', boxShadow: '3px 3px 0px 0px #191A23', color: 'dark.500', fontWeight: 500, fontSize: '18px', ":hover": { boxShadow: '5px 5px 0px 0px #191A23' } }} onClick={() => navigate('/video-chat')}>
                    Start Video Chat
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    height: 'auto',
                }}
                component={'img'}
                src={icons.illustration}
                alt={'logo'}
            />
        </Box>
    )
}

export default Welcome