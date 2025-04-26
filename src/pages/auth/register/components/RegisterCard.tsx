import { Box, Card, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import CustomFormInput from '@components/CustomFormInput'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '@apis/authApi'
import toast from "react-hot-toast";
import { REGISTER_ERROR_MESSAGE, REGISTER_SUCCESS_MESSAGE } from '@constants/messages'
import Button from '@components/ui/Button'
import { isBrowser } from 'react-device-detect'

const RegisterCard = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [register, { isLoading }] = useRegisterMutation()

    const validate = () => {
        if (!email || !name || !password || !confirmPassword) {
            toast.error(REGISTER_ERROR_MESSAGE.PLEASE_FILL_ALL_FIELDS)
            return false
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error(REGISTER_ERROR_MESSAGE.INVALID_CREDENTIALS)
            return false
        }
        if (password !== confirmPassword) {
            toast.error(REGISTER_ERROR_MESSAGE.PASSWORD_DOES_NOT_MATCH)
            return false
        }
        return true
    }

    const handleConfirm = () => {
        if (validate()) {
            try {
                register({ email, name, password })
                toast.success(REGISTER_SUCCESS_MESSAGE)
                navigate('/login')
            } catch (error) {
                toast.error(REGISTER_ERROR_MESSAGE.DEFAULT)
                console.error('Registration error:', error)
            }
        }
    }

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
                    Register
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
                    label="User name"
                    type="text"
                    placeholder="Enter your user name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <CustomFormInput
                    label="Password"
                    type="password"
                    placeholder="Create a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <CustomFormInput
                    label="Confirm password"
                    type="password"
                    placeholder="Confirm your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Box>
            <Button
                category='default'
                shape='square'
                size={isBrowser ? 'medium' : 'small'}
                disableTouchRipple
                disabled={isLoading}
                onClick={handleConfirm}
            >
                {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Register'}
            </Button>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'} gap={1}>
                <Typography variant='body1' sx={{ color: 'black.200' }}>
                    Already have an Account?
                </Typography>
                <Typography variant='body1' sx={{ color: 'black.900', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                    Login
                </Typography>
            </Box>
        </Card>
    )
}

export default RegisterCard