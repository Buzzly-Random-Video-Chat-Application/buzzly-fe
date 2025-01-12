import React from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import CustomFormInput from '../../../components/CustomFormInput'
import { useNavigate } from 'react-router-dom'

const LoginCard = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '30px',
                width: { xs: '95%', sm: '40%' },
                boxShadow: '4px 4px 0px 0px #191A23',
                border: '1px solid #191A23',
                borderRadius: '20px',
                gap: '30px',
                marginLeft: '100px',
            }}
        >
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
                />

                <CustomFormInput
                    label="Password"
                    type="password"
                    placeholder="Create a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </Box>
            <Button sx={{ bgcolor: 'dark.500', color: 'light.500', textTransform: 'none', fontWeight: 600, fontSize: 18, width: '100%', padding: 2, borderRadius: '6px', ":hover": { bgcolor: 'black.100', color: 'black.50' } }}>
                Login
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