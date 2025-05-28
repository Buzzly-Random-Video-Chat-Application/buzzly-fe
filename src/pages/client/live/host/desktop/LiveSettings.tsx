import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import CustomButton from '@components/ui/Button';
import PopupModal from '@components/PopupModal';

interface LiveSettingsProps {
    formState: ILivestreamFormState;
    setFormState: (value: Partial<ILivestreamFormState>) => void;
    devices: ILivestreamDevices;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    stream: MediaStream | null;
    handleStartLive: () => void;
    requestPermissions: () => void;
}

const LiveSettings = ({
    formState,
    setFormState,
    devices,
    openModal,
    setOpenModal,
    stream,
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
                {stream ? (
                    <video
                        ref={(video) => {
                            if (video) video.srcObject = stream;
                        }}
                        autoPlay
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                ) : (
                    <Typography sx={{ color: 'white.50' }}>Loading camera...</Typography>
                )}
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
                        value={formState.livestreamName}
                        onChange={(e) => setFormState({ livestreamName: e.target.value })}
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
                        value={formState.livestreamGreeting}
                        onChange={(e) => setFormState({ livestreamGreeting: e.target.value })}
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
                        value={formState.livestreamAnnouncement}
                        onChange={(e) => setFormState({ livestreamAnnouncement: e.target.value })}
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
                        value={formState.selectedVideo}
                        onChange={(e) => setFormState({ selectedVideo: e.target.value })}
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
                        {devices.video.map((device) => (
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
                        value={formState.selectedMicrophone}
                        onChange={(e) => setFormState({ selectedMicrophone: e.target.value })}
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
                        {devices.audio.map((device) => (
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