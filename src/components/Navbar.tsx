import { Box, Button, Popover, Typography, Avatar, Divider } from '@mui/material';
import { flags, icons } from '../assets';
import { Navbars } from '../constants/app';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { IUser } from '../types/user';
import { ExitToAppRounded, PersonOutlineRounded, SettingsSuggestOutlined } from '@mui/icons-material';
import useLogout from '../utils/useLogout';
import PopupModal from './PopupModal';
import toast from 'react-hot-toast';
import ProfileModal from './ProfileModal';
import SettingModal from './SettingModal';

interface INavbar {
    user: IUser | null;
}

const Navbar = ({ user }: INavbar) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const logout = useLogout();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [openModal, setOpenModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
        handleClose();
    }

    const handleLogout = () => {
        logout();
        handleClose();
        handleCloseModal();
        toast.success('Logged out successfully');
    }

    const handleOpenProfileModal = () => {
        setOpenProfileModal(true);
        handleClose();
    }

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
    }

    const handleOpenSettingModal = () => {
        setOpenSettingModal(true);
        handleClose();
    }

    const handleCloseSettingModal = () => {
        setOpenSettingModal(false);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: { xs: '10px', sm: '20px' }, px: { xs: '10px', sm: '100px' }, width: '100%' }}
            position={'sticky'}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', userSelect: 'none' }} onClick={() => navigate('/')}>
                <Box component={'img'} src={icons.logoD} alt={'logo'} sx={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                <Typography variant='h2'>Buzzly</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                {Navbars.map((item) => (
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
                            '&:hover': { boxShadow: '5px 5px 0px 0px #191A23' }
                        }}
                        onClick={handleClick}
                    />
                ) : (
                    <Button sx={{ textTransform: 'none', padding: '8px 35px', borderRadius: '16px', backgroundColor: 'primary.500', boxShadow: '3px 3px 0px 0px #191A23', color: 'dark.500', fontWeight: 700, fontSize: '18px', ":hover": { boxShadow: '5px 5px 0px 0px #191A23' } }} onClick={() => location.pathname === '/register' ? navigate('/login') : location.pathname === '/login' ? navigate('/register') : navigate('/login')}>
                        {location.pathname === '/login' ? 'Register' : 'Login'}
                    </Button>
                )}
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
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
                        backgroundColor: 'white.500'
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                    width: '150px',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '15px',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer'
                    }} onClick={() => handleOpenProfileModal()}>
                        <Avatar src={user?.avatar} alt={user?.name} sx={{ height: '30px', width: '30px', boxShadow: '3px 3px 0px 0px #191A23' }} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <Typography variant='body2' fontWeight={600} sx={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {user?.name}
                            </Typography>
                            <img src={flags.vn} />
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%', color: 'dark.500' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer'
                    }} onClick={() => handleOpenProfileModal()}>
                        <PersonOutlineRounded sx={{ color: 'dark.500' }} />
                        <Typography variant='body2' fontWeight={600}>Edit profile</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer'
                    }} onClick={() => handleOpenSettingModal()}>
                        <SettingsSuggestOutlined sx={{ color: 'dark.500' }} />
                        <Typography variant='body2' fontWeight={600}>Settings</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer'
                    }} onClick={() => handleOpenModal()}>
                        <ExitToAppRounded sx={{ color: 'dark.500' }} />
                        <Typography variant='body2' fontWeight={600}>Logout</Typography>
                    </Box>
                </Box>
            </Popover>
            <PopupModal
                open={openModal}
                onClose={handleCloseModal}
                title={'Logout'}
                message={'Are you sure you want to logout?'}
                onConfirm={handleLogout}
                stage='warning'
            />
            <ProfileModal user={user} open={openProfileModal} onClose={handleCloseProfileModal} />
            <SettingModal user={user} open={openSettingModal} onClose={handleCloseSettingModal} />
        </Box>
    );
};

export default Navbar;