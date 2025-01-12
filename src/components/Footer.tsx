import { Box } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isType1 = location.pathname === ROUTES.VIDEO_CHAT || location.pathname === ROUTES.ABOUT;

    return (
        <Box>

        </Box>
    )
}

export default Footer