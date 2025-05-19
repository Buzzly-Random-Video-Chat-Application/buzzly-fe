import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import CustomButton from '@components/ui/Button';
import PopupModal from '@components/PopupModal';

interface Device {
    deviceId: string;
    label: string;
}

interface LiveSettingsProps {
    livestreamName: string;
    setLivestreamName: (value: string) => void;
    greeting: string;
    setGreeting: (value: string) => void;
    announcement: string;
    setAnnouncement: (value: string) => void;
    videoDevices: Device[];
    audioDevices: Device[];
    selectedVideo: string;
    setSelectedVideo: (value: string) => void;
    selectedMicrophone: string;
    setSelectedMicrophone: (value: string) => void;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    videoRef: React.RefObject<HTMLVideoElement>;
    handleStartLive: () => void;
    requestPermissions: () => void;
}

const LiveSettings = ({
    livestreamName,
    setLivestreamName,
    greeting,
    setGreeting,
    announcement,
    setAnnouncement,
    videoDevices,
    audioDevices,
    selectedVideo,
    setSelectedVideo,
    selectedMicrophone,
    setSelectedMicrophone,
    openModal,
    setOpenModal,
    videoRef,
    handleStartLive,
    requestPermissions,
}: LiveSettingsProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingX: '10px',
                paddingY: '50px',
                height: '85vh',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'dark.500',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '40%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'dark.500',
                    borderRadius: '10px',
                    padding: '20px',
                    position: 'relative',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: 'white.50',
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                        background: 'inherit',
                        paddingBottom: '10px',
                    }}
                >
                    Edit Live Info
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        paddingY: '32px',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your livestream name"
                        value={livestreamName}
                        onChange={(e) => setLivestreamName(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Greeting
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your greeting message"
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Announcement
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Enter your announcement message"
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        multiline
                        rows={4}
                        sx={textFieldSx}
                    />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Video
                    </Typography>
                    <Select
                        fullWidth
                        value={selectedVideo}
                        onChange={(e) => setSelectedVideo(e.target.value as string)}
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '14px 12px',
                                color: 'white.50',
                            },
                            '& .MuiSelect-icon': {
                                color: 'white.50',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.100',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                        }}
                    >
                        {videoDevices.map((device) => (
                            <MenuItem key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: 'white.50',
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Microphone
                    </Typography>
                    <Select
                        fullWidth
                        value={selectedMicrophone}
                        onChange={(e) => setSelectedMicrophone(e.target.value as string)}
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '14px 12px',
                                color: 'white.50',
                            },
                            '& .MuiSelect-icon': {
                                color: 'white.50',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.100',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white.50',
                            },
                        }}
                    >
                        {audioDevices.map((device) => (
                            <MenuItem key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <CustomButton
                    category="primary"
                    shape="pill"
                    size="small"
                    disableTouchRipple
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 2,
                        paddingTop: '10px',
                    }}
                    onClick={handleStartLive}
                >
                    Start Live
                </CustomButton>

                <PopupModal
                    title="Permission Required"
                    message="Please allow camera and microphone permissions to configure your livestream settings."
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={requestPermissions}
                    stage="permission"
                />
            </Box>
        </Box>
    );
};

export default LiveSettings;

const textFieldSx = {
    '& .MuiInputBase-root': {
        borderRadius: '6px',
        '& fieldset': {
            borderColor: 'white.100',
        },
        '&:hover fieldset': {
            borderColor: 'white.50',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white.50',
            borderWidth: 1,
        },
        '& .MuiInputBase-input': {
            fontSize: { xs: 16, md: 18 },
            padding: { xs: '14px 12px', md: '16px 12px' },
            color: 'white.50',
        },
        '& .MuiInputBase-input::placeholder': {
            color: 'gray.200',
            opacity: 1,
        },
    },
    '& .MuiOutlinedInput-root': {
        padding: 0,
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type="password"]::-ms-reveal, & input[type="password"]::-ms-clear, & input[type="password"]::-webkit-credentials-auto-fill-button': {
        display: 'none',
    },
    '& .MuiInputAdornment-root': {
        marginRight: '12px',
    },
};