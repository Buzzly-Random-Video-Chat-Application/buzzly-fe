import React from 'react'
import { Box, Card, CircularProgress, Typography } from '@mui/material'
import CustomFormInput from '@components/CustomFormInput'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LOGIN_ERROR_MESSAGE, LOGIN_SUCCESS_MESSAGE } from '@constants/messages'
import { useLoginMutation } from '@apis/authApi'
import Button from '@components/ui/Button'
import { isBrowser } from 'react-device-detect'

const LoginCard = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [login, { isLoading }] = useLoginMutation()

    const validate = () => {
        if (!email || !password) {
            toast.error(LOGIN_ERROR_MESSAGE.PLEASE_FILL_ALL_FIELDS)
            return false
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error(LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS)
            return false
        }
        return true
    }

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            const response = await login({ email, password }).unwrap();
            toast.success(LOGIN_SUCCESS_MESSAGE);

            const userRole = response.user.role;

            if (userRole === 'admin') {
                navigate('/dashboard');
            } else if (userRole === 'user') {
                navigate('/video-chat');
            } else {
                toast.error(LOGIN_ERROR_MESSAGE.INVALID_ROLE);
            }
        } catch (error) {
            toast.error(LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS);
            console.error('Login error:', error);
        }
    };
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '30px',
            width: { xs: '100%', md: '40%' },
            boxShadow: '4px 4px 0px 0px #191A23',
            border: '1px solid #191A23',
            borderRadius: '20px',
            gap: '30px',
        }}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'30px'} width={'100%'}>
                <Typography variant="h3">
                    Welcome to Buzzly!
                </Typography>
                <Typography variant="h4">
                    Login
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'30px'} width={'100%'}>
                <CustomFormInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!email && !/^\S+@\S+\.\S+$/.test(email)}
                    helperText={email && !/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
                    required
                />

                <CustomFormInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

            </Box>
            <Button
                category='default'
                shape='square'
                size={isBrowser ? 'medium' : 'small'}
                disableTouchRipple
                disabled={isLoading}
                onClick={handleLogin}
            >
                {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Login'}
            </Button>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'} gap={1}>
                <Typography variant='body1' sx={{ color: 'black.200' }}>
                    Don’t have an Account ?
                </Typography>
                <Typography variant='body1' sx={{ color: 'black.900', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/register')}>
                    Register
                </Typography>
            </Box>
        </Card>
    )
}

export default LoginCard