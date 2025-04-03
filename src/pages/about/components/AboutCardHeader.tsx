import { Box, Typography } from '@mui/material'
import { icons } from '../../../assets'

const AboutCardHeader = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: '50px',
            gap: '50px',
            bgcolor: 'dark.500',
            borderRadius: '30px'
        }}>
            <Box component={'img'} src={icons.about1} sx={{ height: '300px', width: '300px', objectFit: 'cover' }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '30px',
            }}>
                <Typography sx={{ color: 'primary.500', fontSize: '50px !important', fontWeight: 700 }}>Having Fun Together</Typography>
                <Typography sx={{ color: 'white.50', fontSize: '24px', fontWeight: 400 }}>Buzzly is the ultimate platform for online video chats, making it easy to fulfill your social needs with just one click. Discover and connect with new people nearby or across the world effortlessly!</Typography>
            </Box>
        </Box>
    )
}

export default AboutCardHeader