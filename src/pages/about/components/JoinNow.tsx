import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { icons } from '../../../assets'

const JoinNow = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingX: '40px', paddingY: '20px', borderRadius: '45px', bgcolor: '#F3F3F3', width: '100%', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'dark.500', boxShadow: '4px 4px 0px 0px #191A23' }}>
            <Box component={'img'} src={icons.about3} alt={'about'} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '50%', alignItems: 'flex-start' }}>
                <Typography variant='h3'>Join Our Growing Community Right Now</Typography>
                <Divider sx={{ width: '100%', bgcolor: 'dark.500', height: 1.5 }} />
                <Typography variant='body1'>
                    With millions of users worldwide
                    and thousands of conversations
                    happening every minute,
                    <Typography component={'span'} fontWeight={700}>
                        {' '}Buzzly{' '}
                    </Typography>
                    is the perfect place to meet new
                    people and share unforgettable moments.
                </Typography>
                <Typography variant='body1' fontWeight={700}>
                    Download the app today and start your journey!
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
                    Download Now
                </Button>
            </Box>
        </Box>
    )
}

export default JoinNow