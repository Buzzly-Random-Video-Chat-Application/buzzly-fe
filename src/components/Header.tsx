import { Box, Popover, Typography, Avatar, Divider, IconButton } from '@mui/material';
import { icons } from '../assets';
import { headers } from '../constants/app';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ExitToAppRounded, PersonOutlineRounded, SettingsSuggestOutlined, Menu } from '@mui/icons-material';
import useLogout from '../utils/useLogout';
import PopupModal from './PopupModal';
import toast from 'react-hot-toast';
import ProfileModal from './ProfileModal';
import SettingModal from './SettingModal';
import Button from './ui/Button';
import { getUserFlag } from '../utils/userUtils';
import { useAppSelector, RootState } from '../stores/store';

const Header = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const [userAnchorEl, setUserAnchorEl] = useState<HTMLDivElement | null>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const logout = useLogout();
    const open = Boolean(userAnchorEl);
    const menuOpen = Boolean(menuAnchorEl);
    const id = open ? 'simple-popover' : undefined;
    const menuId = menuOpen ? 'menu-popover' : undefined;
    const [openModal, setOpenModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setUserAnchorEl(null);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        handleClose();
        handleMenuClose();
    };

    const handleLogout = () => {
        logout();
        handleClose();
        handleMenuClose();
        handleCloseModal();
        toast.success('Logged out successfully');
    };

    const handleOpenProfileModal = () => {
        setOpenProfileModal(true);
        handleClose();
        handleMenuClose();
    };

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
    };

    const handleOpenSettingModal = () => {
        setOpenSettingModal(true);
        handleClose();
        handleMenuClose();
    };

    const handleCloseSettingModal = () => {
        setOpenSettingModal(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const deviceHeight = window.innerHeight;
            const scrollThreshold = deviceHeight * 0.1;

            setIsScrolled(currentScrollY > 0);

            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: { xs: '10px', sm: '10px', md: '10px', lg: '20px', xl: '20px' },
                px: { xs: '10px', sm: '10px', md: '10px', lg: '100px', xl: '100px' },
                width: '100%',
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                backgroundColor: 'white.50',
                boxShadow: isScrolled ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s ease-in-out',
            }}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', gap: { xs: '10px', md: '20px' }, cursor: 'pointer', userSelect: 'none' }}
                onClick={() => navigate('/')}
            >
                <Box
                    component={'img'}
                    src={icons.logoD}
                    alt={'logo'}
                    sx={{ width: { xs: '30px', md: '50px' }, height: { xs: '30px', md: '50px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                />
                <Typography variant="h2">Buzzly</Typography>
            </Box>

            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
                alignItems: 'center',
                gap: '40px',
            }}>
                {headers.map((item) => (
                    <Typography
                        key={item.name}
                        variant="h6"
                        component="a"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: location.pathname === item.href ? 700 : 400,
                            '&:hover': { fontWeight: 700 },
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate(item.href)}
                    >
                        {item.name}
                    </Typography>
                ))}

                {user ? (
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{
                            height: '50px',
                            width: '50px',
                            boxShadow: '3px 3px 0px 0px #191A23',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { boxShadow: '5px 5px 0px 0px #191A23' },
                        }}
                        onClick={handleClick}
                    />
                ) : (
                    <Button
                        shape="round"
                        category="primary"
                        width="auto"
                        size="small"
                        onClick={() => {
                            if (location.pathname === '/login') {
                                navigate('/register');
                            } else {
                                navigate('/login');
                            }
                        }}
                    >
                        {location.pathname === '/login' ? 'Register' : 'Login'}
                    </Button>
                )}
            </Box>

            <Box
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' },
                    alignItems: 'center',
                }}
            >
                <IconButton onClick={handleMenuClick} sx={{ color: 'dark.500' }}>
                    <Menu />
                </IconButton>
            </Box>

            <Popover
                id={menuId}
                open={menuOpen}
                anchorEl={menuAnchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: 2,
                    '& .MuiPopover-paper': {
                        boxShadow: '3px 3px 0px 0px #191A23',
                        border: '1px solid #191A23',
                        borderRadius: '12px',
                        backgroundColor: 'white.500',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '10px',
                        width: '200px',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    {headers.map((item) => (
                        <Typography
                            key={item.name}
                            variant="body1"
                            component="a"
                            href={item.href}
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: location.pathname === item.href ? 700 : 400,
                                width: '100%',
                                padding: '5px 10px',
                                '&:hover': { fontWeight: 700 },
                            }}
                            onClick={handleMenuClose}
                        >
                            {item.name}
                        </Typography>
                    ))}
                    <Divider sx={{ width: '100%', color: 'dark.500' }} />
                    {user ? (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    cursor: 'pointer',
                                    width: '100%',
                                    padding: '5px 10px',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                                onClick={handleOpenProfileModal}
                            >
                                <PersonOutlineRounded sx={{ color: 'dark.500' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    Edit profile
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    cursor: 'pointer',
                                    width: '100%',
                                    padding: '5px 10px',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                                onClick={handleOpenSettingModal}
                            >
                                <SettingsSuggestOutlined sx={{ color: 'dark.500' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    Settings
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    cursor: 'pointer',
                                    width: '100%',
                                    padding: '5px 10px',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                }}
                                onClick={handleOpenModal}
                            >
                                <ExitToAppRounded sx={{ color: 'dark.500' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    Logout
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <Button
                            shape="round"
                            category="primary"
                            width="100%"
                            size="small"
                            onClick={() => {
                                if (location.pathname === '/login') {
                                    navigate('/register');
                                } else {
                                    navigate('/login');
                                }
                                handleMenuClose();
                            }}
                        >
                            {location.pathname === '/login' ? 'Register' : 'Login'}
                        </Button>
                    )}
                </Box>
            </Popover>

            <Popover
                id={id}
                open={open}
                anchorEl={userAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    mt: 2,
                    '& .MuiPopover-paper': {
                        boxShadow: '3px 3px 0px 0px #191A23',
                        border: '1px solid #191A23',
                        borderRadius: '12px',
                        backgroundColor: 'white.500',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '20px',
                        width: '200px',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '15px',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                        }}
                        onClick={handleOpenProfileModal}
                    >
                        <Avatar
                            src={user?.avatar}
                            alt={user?.name}
                            sx={{ height: '30px', width: '30px', boxShadow: '3px 3px 0px 0px #191A23' }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                {user?.name}
                            </Typography>
                            <img src={getUserFlag(user)} style={{ width: '20px', height: '13px' }} />
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%', color: 'dark.500' }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                        }}
                        onClick={handleOpenProfileModal}
                    >
                        <PersonOutlineRounded sx={{ color: 'dark.500' }} />
                        <Typography variant="body2" fontWeight={600}>
                            Edit profile
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                        }}
                        onClick={handleOpenSettingModal}
                    >
                        <SettingsSuggestOutlined sx={{ color: 'dark.500' }} />
                        <Typography variant="body2" fontWeight={600}>
                            Settings
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                        }}
                        onClick={handleOpenModal}
                    >
                        <ExitToAppRounded sx={{ color: 'dark.500' }} />
                        <Typography variant="body2" fontWeight={600}>
                            Logout
                        </Typography>
                    </Box>
                </Box>
            </Popover>

            <PopupModal
                open={openModal}
                onClose={handleCloseModal}
                title={'Logout'}
                message={'Are you sure you want to logout?'}
                onConfirm={handleLogout}
                stage="warning"
            />
            <ProfileModal open={openProfileModal} onClose={handleCloseProfileModal} />
            <SettingModal user={user} open={openSettingModal} onClose={handleCloseSettingModal} />
        </Box>
    );
};

export default Header;