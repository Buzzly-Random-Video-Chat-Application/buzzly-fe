import { Avatar, Box, Button, Typography } from '@mui/material';
import { icons, images, flags } from '../../../assets';
import { RemoveRedEyeRounded } from '@mui/icons-material';

const LiveBanner = () => {
    const liveCards = [
        { viewers: 120, username: 'Alice', country: flags.us, image: images.live1 },
        { viewers: 95, username: 'Bob', country: flags.uk, image: images.live2 },
        { viewers: 210, username: 'Charlie', country: flags.jp, image: images.live3 },
        { viewers: 78, username: 'Diana', country: flags.jp, image: images.live4 },
        { viewers: 150, username: 'Eve', country: flags.de, image: images.live5 },
    ];

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            mt: '50px',
        }}>
            {/* Thông tin bên trái */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }}>
                <Typography variant="h1" mb={3}>
                    Live Now
                </Typography>
                <Typography variant="h3" mb={2}>
                    Viewer, guest, or host
                </Typography>
                <Button sx={{
                    backgroundColor: 'dark.500',
                    color: 'light.500',
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontSize: '24px',
                    fontWeight: 600,
                    borderRadius: '30px',
                    gap: '10px',
                }} startIcon={<img src={icons.tv} alt="tv" style={{ width: '25px', height: '25px' }} />}>
                    Start Live
                </Button>
            </Box>

            {/* Swiper */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px',
                    width: '200px',
                    transform: 'translateX(165%) scale(0.5)',
                    zIndex: -3,
                    filter: 'brightness(0.8)',
                }}>
                    <Box component={'img'} src={liveCards[0].image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'light.500',
                        bgcolor: 'black.100',
                        padding: '0px 8px',
                        borderRadius: '30px',
                    }}>
                        <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                        <Box sx={{ fontSize: '15px' }}>{liveCards[0].viewers}</Box>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'light.500',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {liveCards[0].username}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            alignItems: 'center',
                        }}>
                            <Avatar src={liveCards[0].image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{liveCards[0].username}</Typography>
                                <img src={liveCards[0].country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px',
                    width: '200px',
                    transform: 'translateX(120%) scale(0.7)',
                    zIndex: -2,
                    filter: 'brightness(0.8)',
                }}>
                    <Box component={'img'} src={liveCards[1].image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'light.500',
                        bgcolor: 'black.100',
                        padding: '0px 8px',
                        borderRadius: '30px',
                    }}>
                        <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                        <Box sx={{ fontSize: '15px' }}>{liveCards[1].viewers}</Box>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'light.500',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {liveCards[1].username}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            alignItems: 'center',
                        }}>
                            <Avatar src={liveCards[1].image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{liveCards[1].username}</Typography>
                                <img src={liveCards[1].country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px',
                    width: '200px',
                    transform: 'translateX(100%) scale(1)',
                    zIndex: 1,
                }}>
                    <Box component={'img'} src={liveCards[2].image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'light.500',
                        bgcolor: 'black.100',
                        padding: '0px 8px',
                        borderRadius: '30px',
                    }}>
                        <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                        <Box sx={{ fontSize: '15px' }}>{liveCards[2].viewers}</Box>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'light.500',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {liveCards[2].username}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            alignItems: 'center',
                        }}>
                            <Avatar src={liveCards[2].image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{liveCards[2].username}</Typography>
                                <img src={liveCards[2].country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px',
                    width: '200px',
                    transform: 'translateX(70%) scale(0.7)',
                    zIndex: -2,
                    filter: 'brightness(0.8)',
                }}>
                    <Box component={'img'} src={liveCards[3].image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'light.500',
                        bgcolor: 'black.100',
                        padding: '0px 8px',
                        borderRadius: '30px',
                    }}>
                        <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                        <Box sx={{ fontSize: '15px' }}>{liveCards[3].viewers}</Box>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'light.500',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {liveCards[3].username}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            alignItems: 'center',
                        }}>
                            <Avatar src={liveCards[3].image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{liveCards[3].username}</Typography>
                                <img src={liveCards[3].country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '300px',
                    width: '200px',
                    transform: 'translateX(25%) scale(0.5)',
                    zIndex: -3,
                    filter: 'brightness(0.8)',
                }}>
                    <Box component={'img'} src={liveCards[4].image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'light.500',
                        bgcolor: 'black.100',
                        padding: '0px 8px',
                        borderRadius: '30px',
                    }}>
                        <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '15px' }} />
                        <Box sx={{ fontSize: '15px' }}>{liveCards[4].viewers}</Box>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'light.500',
                    }}>
                        <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>Live of {liveCards[4].username}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            alignItems: 'center',
                        }}>
                            <Avatar src={liveCards[4].image} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ fontSize: '10px !important', fontWeight: 600 }}>{liveCards[4].username}</Typography>
                                <img src={liveCards[4].country} alt="country flag" style={{ width: '10px', height: '10px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LiveBanner;
