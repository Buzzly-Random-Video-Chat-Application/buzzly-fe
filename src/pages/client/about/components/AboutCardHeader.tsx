import { Box, Typography } from '@mui/material'
import { icons } from '../../../../assets'

const AboutCardHeader = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            width: '100%',
            padding: { xs: '20px', md: '50px' },
            gap: { xs: '20px', md: '50px' },
            bgcolor: 'dark.500',
            borderRadius: '30px',
            textAlign: { xs: 'center', md: 'left' }
        }}>
            <Box component={'img'} src={icons.about1} sx={{
                height: { xs: '200px', md: '300px' },
                width: { xs: '200px', md: '300px' },
                objectFit: 'cover'
            }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: '20px',
            }}>
                <Typography sx={{
                    color: 'primary.500',
                    fontSize: { xs: '32px', md: '50px' },
                    fontWeight: 700
                }}>
                    Having Fun Together
                </Typography>
                <Typography sx={{
                    color: 'white.50',
                    fontSize: { xs: '18px', md: '24px' },
                    fontWeight: 400
                }}>
                    Buzzly is the ultimate platform for online video chats, making it easy to fulfill your social needs with just one click. Discover and connect with new people nearby or across the world effortlessly!                </Typography>
            </Box>
        </Box>
    )
}

export default AboutCardHeader
