import { Box, Typography } from '@mui/material'
import { icons } from '../../../../assets'
import Button from '../../../../components/ui/Button'
import { isBrowser } from 'react-device-detect'

const AboutUsCard = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: { xs: '50px', md: '100px' }
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: '20px',
                textAlign: { xs: 'center', md: 'left' }
            }}>
                <Typography variant={isBrowser ? 'h3' : 'h4'} sx={{
                    backgroundColor: 'primary.500',
                    borderRadius: 2,
                    padding: 1,
                    paddingX: 2
                }}>
                    About Us
                </Typography>
                <Typography width={{ xs: '100%', md: '50%' }}>
                    Lorem ipsum dolor sit amet consectetur. Risus nisl scelerisque
                    dolor ut condimentum vitae. Amet vitae adipiscing sit in.
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                padding: { xs: '20px', md: '40px' },
                borderRadius: '45px',
                bgcolor: '#F3F3F3',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: '4px 4px 0px 0px #191A23',
                gap: { xs: '20px', md: '50px' }
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: '20px', md: '40px' },
                    width: { xs: '100%', md: '50%' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' }
                }}>
                    <Typography variant={isBrowser ? 'h2' : 'h3'}>Welcome to Buzzly</Typography>
                    <Typography variant={isBrowser ? 'body1' : 'body2'}>
                        Buzzly is a cutting-edge random video
                        chat platform designed to connect people
                        from around the globe instantly. Whether
                        you're looking to meet new friends, explore
                        different cultures, or simply enjoy fun and
                        meaningful conversations, our app makes it
                        easy and exciting to connect with others in real-time.
                    </Typography>
                    <Button
                        category='primary'
                        shape='square'
                        size={isBrowser ? 'medium' : 'small'}
                        width='auto'
                    >
                        Start Video Chat
                    </Button>
                </Box>
                <Box
                    component={'img'}
                    src={icons.about2} alt={'experience'}
                    sx={{ width: { xs: '80%', md: '50%' }, maxWidth: '400px' }}
                />
            </Box>
        </Box>
    )
}

export default AboutUsCard
