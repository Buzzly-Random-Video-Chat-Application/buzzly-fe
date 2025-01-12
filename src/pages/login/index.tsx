import React from 'react'
import { Box } from '@mui/material'
import LoginCard from './components/LoginCard'
import { icons } from '../../assets'

const Login = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '50px' }}>
            <LoginCard />
            <img src={icons.auth} style={{ width: '50%', height: '50%' }} />
        </Box>
    )
}

export default Login