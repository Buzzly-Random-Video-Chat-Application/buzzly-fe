import { useState, useEffect, useMemo } from 'react';
import { Box, Drawer, IconButton, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { EditNotificationsRounded, Stars, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LiveTvRounded, VideoCameraFrontRounded } from '@mui/icons-material';
import { ROUTES } from '../constants/routes';
import {
    GridViewRounded,
    Article,
    AccountCircleRounded,
    Logout
} from '@mui/icons-material';
import { icons } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import PopupModal from './PopupModal';
import useLogout from '../utils/useLogout';
import toast from 'react-hot-toast';
import { RootState, useAppSelector } from '../stores/store';

type SidebarItemProps = {
    type: string;
    icon: React.ReactNode;
    title: string;
    selectedMenu: string;
    openSideBar: boolean;
    onClick: () => void;
};

const SidebarItem = ({ type, icon, title, selectedMenu, openSideBar, onClick }: SidebarItemProps) => {
    return (
        <ListItem disablePadding onClick={onClick} sx={{
            justifyContent: openSideBar ? 'flex-start' : 'center',
            borderRadius: '8px',
            padding: openSideBar ? '0.5rem 1rem' : '0.5rem',
            backgroundColor: selectedMenu === type ? 'primary.500' : 'transparent',
            '&:hover': { backgroundColor: selectedMenu === type ? 'primary.500' : 'primary.100' },
            cursor: 'pointer',
            userSelect: 'none',
            mb: 1,
        }}>
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: openSideBar ? 2 : 0,
                    justifyContent: 'center',
                    fontSize: 20,
                    color: 'dark.500',
                }}
            >
                {icon}
            </ListItemIcon>
            {openSideBar && (
                <ListItemText
                    primary={title}
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: '1rem',
                            whiteSpace: 'nowrap',
                            color: 'dark.500',
                            fontWeight: 400,
                        }
                    }}
                />
            )}
        </ListItem>
    );
};

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector((state: RootState) => state.user);
    const [openSideBar, setOpenSideBar] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('dashboard');
    const [openModal, setOpenModal] = useState(false);
    const logout = useLogout();

    const sidebarItems = useMemo(() => [
        {
            type: 'dashboard',
            icon: <GridViewRounded />,
            title: 'Dashboard',
            href: ROUTES.DASHBOARD,
        },
        {
            type: 'users-management',
            icon: <AccountCircleRounded />,
            title: 'Users Management',
            href: ROUTES.USERS_MANAGEMENT,
        },
        {
            type: 'reviews-management',
            icon: <Stars />,
            title: 'Reviews Management',
            href: ROUTES.REVIEWS_MANAGEMENT,
        },
        {
            type: 'blogs-management',
            icon: <Article />,
            title: 'Blogs Management',
            href: ROUTES.BLOGS_MANAGEMENT,
        },
        {
            type: 'livestreams-management',
            icon: <LiveTvRounded />,
            title: 'Livestreams Management',
            href: ROUTES.LIVESTREAMS_MANAGEMENT,
        },
        {
            type: 'connections-management',
            icon: <VideoCameraFrontRounded />,
            title: 'Connections Management',
            href: ROUTES.CONNECTIONS_MANAGEMENT,
        },
        {
            type: 'announcements-management',
            icon: <EditNotificationsRounded />,
            title: 'Announcements',
            href: ROUTES.ANNOUNCEMENTS_MANAGEMENT,
        },
        {
            type: 'settings',
            icon: <AccountCircleRounded />,
            title: 'Profile',
            href: ROUTES.SETTINGS,
        },
    ], []);

    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = sidebarItems.find(item => item.href === currentPath);
        if (matchedItem) {
            setSelectedMenu(matchedItem.type);
        } else {
            setSelectedMenu('/dashboard');
        }
    }, [location.pathname, sidebarItems]);

    const handleItemClick = (type: string, href: string) => {
        setSelectedMenu(type);
        navigate(href);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleLogout = () => {
        logout();
        handleCloseModal();
        toast.success('Logged out successfully');
    };

    return (
        <Drawer
            variant="permanent"
            open={openSideBar}
            anchor="left"
            sx={{
                width: openSideBar ? '20rem' : '6rem',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: openSideBar ? '20rem' : '6rem',
                    transition: '0.2s ease-in-out',
                    overflow: 'hidden',
                    padding: '2rem 0rem 2rem 1rem',
                    border: 'none',
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: 'white.50',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid #F0F1F2',
                borderRadius: 4,
                width: '100%',
                p: 2,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: openSideBar ? 'flex-start' : 'center', px: 2, userSelect: 'none' }}>
                    {openSideBar && (
                        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', gap: 2 }}>
                            <Box
                                component={'img'}
                                src={icons.logo}
                                alt={'logo'}
                                sx={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            />
                            <Typography variant="h4">
                                Buzzly
                            </Typography>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setOpenSideBar(!openSideBar)}
                        sx={{ color: 'dark.500', '&:hover': { backgroundColor: '#f0f0f0' } }}
                    >
                        {openSideBar ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                    </IconButton>
                </Box>
                <Box flex={1}>
                    <List>
                        {sidebarItems.slice(0, -1).map((item) => (
                            <SidebarItem
                                key={item.type}
                                type={item.type}
                                icon={item.icon}
                                title={item.title}
                                selectedMenu={selectedMenu}
                                openSideBar={openSideBar}
                                onClick={() => handleItemClick(item.type, item.href)}
                            />
                        ))}
                    </List>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List>
                    <SidebarItem
                        icon={
                            user ? (
                                <Box component={'img'} src={user.avatar} alt={user.name} sx={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <AccountCircleRounded />
                            )
                        }
                        type="settings"
                        title={user ? user.name : "Profile"}
                        selectedMenu={selectedMenu}
                        openSideBar={openSideBar}
                        onClick={() => handleItemClick('settings', ROUTES.SETTINGS)}
                    />
                    <SidebarItem
                        icon={<Logout />}
                        type="logout"
                        title="Logout"
                        selectedMenu={selectedMenu}
                        openSideBar={openSideBar}
                        onClick={() => setOpenModal(true)}
                    />
                </List>
            </Box>
            <PopupModal
                open={openModal}
                onClose={handleCloseModal}
                title={'Logout'}
                message={'Are you sure you want to logout?'}
                onConfirm={handleLogout}
                stage="warning"
            />
        </Drawer>
    );
};

export default Sidebar;