import { Home, NotificationsRounded, Search, SettingsRounded } from '@mui/icons-material';
import { Box, IconButton, Typography, TextField, InputAdornment, Avatar } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../stores/store';

const AdminTopBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAppSelector((state) => state.user);

    return (
        <Box
            sx={{
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
                flexShrink: 0,
                position: 'sticky',
                zIndex: 1100,
                left: 'auto',
                right: 0,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'saturate(200%) blur(1.875rem)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgb(52, 71, 103)',
                top: '0.75rem',
                minHeight: '4.6875rem',
                display: 'grid',
                alignItems: 'center',
                padding: '0.5rem 0',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '0.75rem',
                mb: '2rem',
                border: '1px solid #F0F1F2',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0 1rem',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        color: 'dark.500',
                    }}
                >
                    <IconButton
                        disableTouchRipple
                        sx={{
                            padding: 0,
                            color: 'dark.500',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Home fontSize="small" />
                    </IconButton>
                    /
                    <Typography
                        sx={{
                            fontSize: '1.4rem',
                            fontWeight: 400,
                            color: 'dark.500',
                        }}
                    >
                        Home
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <TextField
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            flex: 1,
                            maxWidth: { xs: '100%', md: 300 },
                            '& .MuiInputBase-root': {
                                padding: '10px 20px 10px 8px',
                                borderRadius: '8px',
                                fontSize: 16,
                            },
                            '& .MuiInputBase-input': {
                                padding: '2px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray.200',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray.400',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'dark.500',
                                borderWidth: 1,
                            },
                        }}
                    />
                    <Avatar
                        src={user?.avatar}
                        alt="User Avatar"
                        sx={{
                            width: 40,
                            height: 40,
                            marginLeft: '1rem',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'gray.200',
                            },
                        }}
                    />
                    <IconButton>
                        <SettingsRounded />
                    </IconButton>
                    <IconButton>
                        <NotificationsRounded />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminTopBar;