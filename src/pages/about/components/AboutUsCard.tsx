import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { icons } from '../../../assets'

const AboutUsCard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '100px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant='h3' sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    About Us
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur. Risus nisl scelerisque<br />
                    dolor ut condimentum vitae. Amet vitae adipiscing sit in.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', paddingX: '40px', paddingY: '20px', borderRadius: '45px', bgcolor: '#F3F3F3', width: '100%', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'dark.500', boxShadow: '4px 4px 0px 0px #191A23' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '50%', alignItems: 'flex-start' }}>
                    <Typography variant='h3'>Welcome to Buzzly</Typography>
                    <Typography variant='body1'>
                        Buzzly is a cutting-edge random video
                        chat platform designed to connect people
                        from around the globe instantly. Whether
                        you're looking to meet new friends, explore
                        different cultures, or simply enjoy fun and
                        meaningful conversations, our app makes it
                        easy and exciting to connect with others in real-time.
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
                        Start Video Chat
                    </Button>
                </Box>
                <Box component={'img'} src={icons.about2} alt={'experience'} />
            </Box>
        </Box >
    )
}

export default AboutUsCard