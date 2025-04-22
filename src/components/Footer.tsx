import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import {
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { icons } from '../assets';
import { headers } from '../constants/app';
import { Facebook, GitHub, Instagram } from '@mui/icons-material';

const SocialIcons = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        gap: '10px'
    }}>
        {[
            { icon: <Facebook />, link: 'https://www.facebook.com' },
            { icon: <Instagram />, link: 'https://www.instagram.com' },
            { icon: <GitHub />, link: 'https://www.github.com' }
        ].map((item, index) => (
            <IconButton
                key={index}
                sx={{ color: 'white.50' }}
                onClick={() => window.open(item.link)}
            >
                {item.icon}
            </IconButton>
        ))}
    </Box>
);

const ContactInfo = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: { xs: 'center', md: 'flex-start' }
    }}>
        <Typography sx={{
            backgroundColor: 'primary.500',
            padding: '2px 8px',
            borderRadius: '8px',
            fontWeight: 600
        }}>
            Contact us:
        </Typography>
        <Typography sx={{ color: 'white.50', textAlign: { xs: 'center', md: 'left' } }}>
            Email: info@buzzly.com
        </Typography>
        <Typography sx={{ color: 'white.50', textAlign: { xs: 'center', md: 'left' } }}>
            Phone: 555-567-8901
        </Typography>
        <Typography sx={{ color: 'white.50', textAlign: { xs: 'center', md: 'left' } }}>
            Address: 1234 Main St Moonstone<br />City, Stardust State 12345
        </Typography>
    </Box>
);

const SubscriptionForm = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '15px',
        alignItems: 'center',
        width: { xs: '100%', md: 'auto' }
    }}>
        <TextField
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Enter your email"
            sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '6px',
                    '& fieldset': { borderColor: 'white.50' },
                    '&:hover fieldset': { borderColor: 'white.50' },
                    '&.Mui-focused fieldset': { borderColor: 'white.50', borderWidth: 1 },
                    '& .MuiInputBase-input': { fontSize: { xs: 16, md: 18 }, color: 'white.50' },
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
    </Box >
);

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSpecialPage = [ROUTES.ABOUT, ROUTES.HOME, ROUTES.REVIEWS].includes(location.pathname);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: isSpecialPage ? { xs: '10px', md: '100px' } : '0px',
            width: '100%'
        }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: isSpecialPage ? { xs: '20px 20px 0 0', md: '30px 30px 0 0' } : '0px',
                    backgroundColor: 'dark.500',
                    paddingX: { xs: '20px', md: '100px' },
                    paddingY: { xs: '30px', md: '50px' },
                    gap: { xs: '30px', md: '50px' },
                    width: '100%'
                }}
            >
                {/* Top Section */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    gap: { xs: '20px', md: '0' }
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                        onClick={() => navigate(ROUTES.HOME)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: '40px', md: '50px' },
                                height: { xs: '40px', md: '50px' },
                            }}
                            component="img"
                            src={icons.logoL}
                            alt="logo"
                        />
                        <Typography variant="h2" color="white.50" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                            Buzzly
                        </Typography>
                    </Box>

                    {/* Desktop Navigation */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: '30px'
                    }}>
                        {headers.map((item) => (
                            <Typography
                                key={item.name}
                                variant="h6"
                                component="a"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'white.50',
                                    fontWeight: location.pathname === item.href ? 700 : 400,
                                    '&:hover': { fontWeight: 700 },
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(item.href)}
                            >
                                {item.name}
                            </Typography>
                        ))}
                        <SocialIcons />
                    </Box>
                </Box>

                {/* Mobile Navigation */}
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    width: '100%'
                }}>
                    {headers.map((item) => (
                        <Typography
                            key={item.name}
                            variant="body1"
                            component="a"
                            href={item.href}
                            sx={{
                                textDecoration: 'none',
                                color: 'white.50',
                                fontWeight: location.pathname === item.href ? 700 : 400,
                                '&:hover': { fontWeight: 700 },
                                textAlign: 'center'
                            }}
                        >
                            {item.name}
                        </Typography>
                    ))}
                    <SocialIcons />
                </Box>

                {/* Contact and Subscription */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    gap: { xs: '30px', md: '0' }
                }}>
                    <ContactInfo />
                    <SubscriptionForm />
                </Box>

                {/* Bottom Section */}
                <Divider sx={{ width: '100%', backgroundColor: 'white.50' }} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'flex-start',
                    width: '100%',
                    alignItems: 'center',
                    gap: '15px',
                    textAlign: { xs: 'center', md: 'left' }
                }}>
                    <Typography sx={{ color: 'white.50' }}>
                        © 2025 Buzzly. All Rights Reserved.
                    </Typography>
                    <Typography sx={{
                        color: 'white.50',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}>
                        Privacy Policy
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;