import CustomFormInput from '@components/CustomFormInput'
import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import CustomButton from '@components/ui/Button'
import { isBrowser } from 'react-device-detect'
import { icons } from '@assets/index'
import { useResetPasswordMutation } from '@apis/authApi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const navigate = useNavigate();

    const validate = () => {
        if (!password || !confirmPassword) {
            return 'Please fill all fields'
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters'
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match'
        }
        return ''
    }

    const handleResetPassword = async () => {
        const error = validate()
        if (error) {
            console.error(error)
            return
        }

        try {
            await resetPassword({ password, token }).unwrap()
            toast.success('Password reset successfully')

            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            console.error('Error resetting password:', error)
        }
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
                alignItems: 'start',
                flexDirection: 'column',
                width: { xs: '100%', md: '50%' },
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
                py: { xs: '20px', md: '50px' },
                px: { xs: '10px', md: '50px' },
                borderRadius: '10px',
                gap: '20px',
            }}>
                <Typography variant={'h2'} fontWeight={600}>
                    Forgot Password
                </Typography>
                <Typography variant={'body1'}>
                    Please enter your email address to reset your password.
                </Typography>
                <CustomFormInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!password && password.length < 6}
                    helperText={password && password.length < 6 ? 'Password must be at least 6 characters' : ''}
                    required
                />
                <CustomFormInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPassword && confirmPassword !== password}
                    helperText={confirmPassword && confirmPassword !== password ? 'Passwords do not match' : ''}
                    required
                />
                <CustomButton
                    category='secondary'
                    shape='square'
                    size={isBrowser ? 'medium' : 'small'}
                    disableTouchRipple
                    onClick={handleResetPassword}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Confirm'}
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

export default ResetPassword