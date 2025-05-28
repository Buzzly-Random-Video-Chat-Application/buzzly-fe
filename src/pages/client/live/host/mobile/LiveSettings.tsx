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
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                bgcolor: 'dark.500',
                padding: '16px',
                gap: '16px',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '60%',
                    bgcolor: 'dark.700',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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

            <Typography
                sx={{
                    fontWeight: 700,
                    color: 'white.50',
                    fontSize: '18px',
                }}
            >
                Edit Live Info
            </Typography>

            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Livestream name"
                value={formState.livestreamName}
                onChange={(e) => setFormState({ livestreamName: e.target.value })}
                sx={textFieldSx}
            />

            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Greeting message"
                value={formState.livestreamGreeting}
                onChange={(e) => setFormState({ livestreamGreeting: e.target.value })}
                sx={textFieldSx}
            />

            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Announcement message"
                value={formState.livestreamAnnouncement}
                onChange={(e) => setFormState({ livestreamAnnouncement: e.target.value })}
                sx={textFieldSx}
            />

            <Select
                fullWidth
                value={formState.selectedVideo}
                onChange={(e) => setFormState({ selectedVideo: e.target.value as string })}
                displayEmpty
                renderValue={(value) => (value ? devices.video.find((d) => d.deviceId === value)?.label : 'Select Video')}
                sx={selectSx}
            >
                {devices.video.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                    </MenuItem>
                ))}
            </Select>

            <Select
                fullWidth
                value={formState.selectedMicrophone}
                onChange={(e) => setFormState({ selectedMicrophone: e.target.value as string })}
                displayEmpty
                renderValue={(value) => (value ? devices.audio.find((d) => d.deviceId === value)?.label : 'Select Microphone')}
                sx={selectSx}
            >
                {devices.audio.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                    </MenuItem>
                ))}
            </Select>

            <CustomButton
                category="primary"
                shape="pill"
                size="small"
                disableTouchRipple
                sx={{ width: '100%', mt: '16px' }}
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
    );
};

export default LiveSettings;

const textFieldSx = {
    '& .MuiInputBase-root': {
        borderRadius: '6px',
        bgcolor: 'white.50',
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'primary.500',
        },
        '& .MuiInputBase-input': {
            fontSize: '14px',
            padding: '12px',
            color: 'dark.500',
        },
    },
};

const selectSx = {
    borderRadius: '6px',
    bgcolor: 'white.50',
    '& .MuiSelect-select': {
        padding: '12px',
        color: 'dark.500',
        fontSize: '14px',
    },
    '& .MuiSelect-icon': {
        color: 'dark.500',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.500',
    },
};