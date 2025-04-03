import { Box, Button, Typography } from '@mui/material';
import { CircleRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { images, icons } from '../../../assets';
import React, { useEffect, useRef } from 'react';
import GenderModal from '../components/GenderModal';
import CountryModal from '../components/CountryModal';

interface WaitingConnectionBoxProps {
    handleCountrySelect: (country: string) => void;
    handleGenderSelect: (gender: string) => void;
    handleStartVideoChat: () => void;
    stream: MediaStream | null;
}

const WaitingConnectionBox = ({ handleCountrySelect, handleGenderSelect, handleStartVideoChat, stream }: WaitingConnectionBoxProps) => {
    const [openGenderModal, setOpenGenderModal] = React.useState(false);
    const [openCountryModal, setOpenCountryModal] = React.useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'black',
            height: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {!stream ? (
                <Box
                    component={'img'}
                    src={images.vidbg}
                    alt="video chat background"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <Box sx={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '10px',
                padding: '10px',
            }}>
                <Button
                    sx={{
                        bgcolor: 'primary.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        paddingX: '24px',
                        paddingY: '8px',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}
                    disableTouchRipple
                    startIcon={<img src={icons.gender} alt="gender icon" />}
                    endIcon={openGenderModal ? <KeyboardArrowDownRounded /> : <KeyboardArrowUpRounded />}
                    onClick={() => setOpenGenderModal(!openGenderModal)}
                >
                    Gender
                </Button>
                <Button
                    sx={{
                        bgcolor: 'primary.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        paddingX: '24px',
                        paddingY: '8px',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}
                    disableTouchRipple
                    startIcon={<img src={icons.earth} alt="earth icon" />}
                    endIcon={openCountryModal ? <KeyboardArrowDownRounded /> : <KeyboardArrowUpRounded />}
                    onClick={() => setOpenCountryModal(!openCountryModal)}
                >
                    Country
                </Button>
                <Button
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        bgcolor: 'white.50',
                        color: 'dark.500',
                        borderRadius: '30px',
                        paddingX: '24px',
                        paddingY: '8px',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}
                    disableTouchRipple
                    startIcon={<img src={icons.camera} alt="camera icon" />}
                    onClick={handleStartVideoChat}
                >
                    Start video chat
                </Button>
            </Box>
            {!stream && (
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    zIndex: 1,
                    width: '100%',
                    userSelect: 'none',
                    gap: '10px',
                }}>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        alignItems: 'center',
                    }}>
                        <Box
                            component={'img'}
                            src={icons.logoL}
                            alt="logo"
                            sx={{ width: '50px', height: '50px' }}
                        />
                        <Typography variant="h2" sx={{ color: 'white.50', fontWeight: 700 }}>
                            Buzzly
                        </Typography>
                    </Box>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        marginTop: '10px',
                    }}>
                        <CircleRounded sx={{ height: 10, width: 10, color: 'primary.500' }} />
                        <Typography sx={{
                            fontSize: '18px',
                            color: 'white.50',
                            textAlign: 'center',
                        }}>
                            158,431{' '}
                            <Typography
                                component={'span'}
                                sx={{
                                    color: 'primary.500',
                                    fontWeight: 700,
                                }}
                            >
                                buzzliers
                            </Typography>{' '}
                            are online, connect now!
                        </Typography>
                    </Box>
                </Box>
            )}
            <GenderModal
                open={openGenderModal}
                onClose={() => setOpenGenderModal(false)}
                onGenderSelect={handleGenderSelect}
                onStartVideoChat={handleStartVideoChat}
            />
            <CountryModal
                open={openCountryModal}
                onClose={() => setOpenCountryModal(false)}
                onCountrySelect={handleCountrySelect}
                onStartVideoChat={handleStartVideoChat}
            />
        </Box>
    );
};

export default WaitingConnectionBox;