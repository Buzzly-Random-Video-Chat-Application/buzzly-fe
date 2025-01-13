import { Box, Button, Typography } from '@mui/material';
import { icons } from '../assets';
import { NavbarItems } from '../constants/app';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            position={'sticky'}
            sx={{ display: 'flex', justifyContent: 'space-between', py: { xs: '10px', sm: '20px' }, px: { xs: '10px', sm: '100px' } }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', userSelect: 'none' }} onClick={() => navigate('/')}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px',
                    }}
                    component={'img'}
                    src={icons.logoD}
                    alt={'logo'}
                />
                <Typography variant='h2'>Buzzly</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                {NavbarItems.map((item) => (
                    <Typography
                        key={item.name}
                        variant='h6'
                        component='a'
                        href={item.href}
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: location.pathname === item.href ? 700 : 400,
                            '&:hover': { fontWeight: 700 },
                        }}
                    >
                        {item.name}
                    </Typography>
                ))}

                <Button sx={{ textTransform: 'none', padding: '8px 35px', borderRadius: '16px', backgroundColor: 'primary.500', boxShadow: '3px 3px 0px 0px #191A23', color: 'dark.500', fontWeight: 700, fontSize: '18px', ":hover": { boxShadow: '5px 5px 0px 0px #191A23' } }} onClick={() => navigate('/login')}>
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Navbar;
