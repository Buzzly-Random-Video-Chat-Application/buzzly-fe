import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { icons } from '../assets';
import { Navbars } from '../constants/app';
import { Facebook, GitHub, Instagram } from '@mui/icons-material';

const SocialIcons = () => (
    <Box sx={{ display: 'flex' }}>
        {[{ icon: <Facebook />, link: 'https://www.facebook.com' },
        { icon: <Instagram />, link: 'https://www.instagram.com' },
        { icon: <GitHub />, link: 'https://www.github.com' }].map((item, index) => (
            <IconButton key={index} sx={{ color: 'light.500' }} onClick={() => window.open(item.link)}>
                {item.icon}
            </IconButton>
        ))}
    </Box>
);

const ContactInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
        <Typography sx={{ backgroundColor: 'primary.500', padding: '2px 8px', borderRadius: '8px', fontWeight: 600 }}>Contact us:</Typography>
        <Typography sx={{ color: 'light.500' }}>Email: info@buzzly.com</Typography>
        <Typography sx={{ color: 'light.500' }}>Phone: 555-567-8901</Typography>
        <Typography sx={{ color: 'light.500' }}>Address: 1234 Main St Moonstone<br />City, Stardust State 12345</Typography>
    </Box>
);

const SubscriptionForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
        <TextField
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Enter your email"
            sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '6px',
                    '& fieldset': { borderColor: 'light.500' },
                    '&:hover fieldset': { borderColor: 'light.500' },
                    '&.Mui-focused fieldset': { borderColor: 'light.500', borderWidth: 1 },
                    '& .MuiInputBase-input': { fontSize: 18, color: 'light.500' },
                },
                '& input[type=number]': { MozAppearance: 'textfield' },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                },
            }}
        />
        <Button
            sx={{
                bgcolor: 'primary.500',
                color: 'dark.500',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 18,
                width: '100%',
                borderRadius: '6px',
                ':hover': { bgcolor: 'black.100', color: 'black.50' },
                padding: 1.6,
            }}
        >
            Subscribe to news
        </Button>
    </Box>
);

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSpecialPage = [ROUTES.ABOUT, ROUTES.HOME, ROUTES.REVIEWS].includes(location.pathname);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: isSpecialPage ? '100px' : '0px', width: '100%' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: isSpecialPage ? '30px 30px 0px 0px' : '0px',
                    backgroundColor: 'dark.500',
                    paddingX: '100px',
                    paddingY: '50px',
                    gap: '50px',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => navigate(ROUTES.HOME)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                            }}
                            component="img"
                            src={icons.logoL}
                            alt="logo"
                        />
                        <Typography variant="h2" color="light.500">
                            Buzzly
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                            {Navbars.map((item) => (
                                <Typography
                                    key={item.name}
                                    variant="h6"
                                    component="a"
                                    href={item.href}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'light.500',
                                        fontWeight: location.pathname === item.href ? 700 : 400,
                                        '&:hover': { fontWeight: 700 },
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            ))}
                        </Box>
                        <SocialIcons />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <ContactInfo />
                    <SubscriptionForm />
                </Box>

                <Divider sx={{ width: '100%', backgroundColor: 'light.500' }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: '20px' }}>
                    <Typography sx={{ color: 'light.500' }}>© 2025 Buzzly. All Rights Reserved.</Typography>
                    <Typography sx={{ color: 'light.500', textDecoration: 'underline', cursor: 'pointer' }}>
                        Privacy Policy
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
