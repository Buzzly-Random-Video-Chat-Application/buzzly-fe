import { Box, Divider, Typography } from '@mui/material'
import { icons } from '../../../../assets'
import Button from '../../../../components/ui/Button'
import { isBrowser } from 'react-device-detect'
const JoinNow = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: '20px', md: '40px' },
            borderRadius: '30px',
            bgcolor: '#F3F3F3',
            width: '100%',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '3px 3px 0px 0px #191A23',
            textAlign: { xs: 'center', md: 'left' },
            justifyContent: { xs: 'none', sm: 'space-between' }
        }}>
            <Box component={'img'} src={icons.about3} alt={'about'} sx={{ width: { xs: '200px', md: 'auto' }, height: 'auto' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: { xs: '100%', md: '50%' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
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
                <Button
                    category='primary'
                    size={isBrowser ? 'medium' : 'small'}
                    shape='square'
                    width='auto'
                >
                    Download Now
                </Button>
            </Box>
        </Box>
    )
}

export default JoinNow