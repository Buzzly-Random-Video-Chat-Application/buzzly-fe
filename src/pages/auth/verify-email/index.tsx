import { Box, CircularProgress, Typography } from '@mui/material'
import CustomButton from '@components/ui/Button'
import { isBrowser } from 'react-device-detect'
import { icons } from '@assets/index'
import { useVerifyEmailMutation } from '@apis/authApi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token') || '';

    const [verifyEmail, { isLoading }] = useVerifyEmailMutation()
    const handleVerifyEmail = async () => {
        await verifyEmail(token).unwrap()
            .catch((error) => {
                toast.error('Error verifying email')
                console.error('Error verifying email:', error)
            })
            .finally(() => {
                toast.success('Email verified successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            })
    }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: { xs: '100%', md: '50%' },
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
                py: { xs: '20px', md: '50px' },
                px: { xs: '10px', md: '50px' },
                borderRadius: '10px',
                gap: '20px',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 3,
                    mb: 4,
                }}>
                    <Box component={'img'} src={icons.logo} alt={'logo'} sx={{
                        width: '68px',
                        height: '68px',
                    }} />
                    <Typography variant={'h1'} fontWeight={600}>
                        Buzzly
                    </Typography>
                </Box>
                <Typography variant={'h3'} fontWeight={600} width={'100%'} textAlign={'center'}>
                    Verify your email address
                </Typography>
                <Typography variant={'body1'} fontWeight={400} width={'100%'} textAlign={'center'} mb={4}>
                    Please confirm that you want to use this as your Sellfy account email address.
                    Once it's done you will be able to start selling!
                </Typography>

                <CustomButton
                    category='secondary'
                    shape='square'
                    size={isBrowser ? 'medium' : 'small'}
                    disableTouchRipple
                    onClick={handleVerifyEmail}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Verify Email'}
                </CustomButton>
            </Box>
            <Box component={'img'} src={icons.illusabout} alt={'illustration-1'} sx={{
                position: 'absolute',
                top: '10%',
                left: '-10%',
            }} />
            <Box component={'img'} src={icons.illusabout} alt={'illustration-2'} sx={{
                position: 'absolute',
                bottom: '10%',
                right: '-10%',
            }} />
            <Box component={'img'} src={icons.aboutstartdark} alt={'illustration-3'} sx={{
                position: 'absolute',
                bottom: '30%',
                left: '10%',
            }} />
            <Box component={'img'} src={icons.aboutstartlight} alt={'illustration-4'} sx={{
                position: 'absolute',
                top: '30%',
                right: '10%',
            }} />
        </Box>
    )
}

export default VerifyEmail