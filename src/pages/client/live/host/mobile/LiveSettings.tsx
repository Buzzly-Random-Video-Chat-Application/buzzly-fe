import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import CustomButton from '@components/ui/Button';
import PopupModal from '@components/PopupModal';
import { useEffect, useRef } from 'react';

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
    handleStartLive: () => void;
    requestPermissions: () => void;
    stream: MediaStream | null;
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
    handleStartLive,
    requestPermissions,
    stream,
}: LiveSettingsProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log('LiveSettings: stream updated', stream);
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

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
                        ref={videoRef}
                        autoPlay
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
                value={livestreamName}
                onChange={(e) => setLivestreamName(e.target.value)}
                sx={textFieldSx}
            />

            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Greeting message"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                sx={textFieldSx}
            />

            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Announcement message"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                sx={textFieldSx}
            />

            <Select
                fullWidth
                value={selectedVideo}
                onChange={(e) => setSelectedVideo(e.target.value as string)}
                displayEmpty
                renderValue={(value) => (value ? videoDevices.find((d) => d.deviceId === value)?.label : 'Select Video')}
                sx={selectSx}
            >
                {videoDevices.map((device) => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                    </MenuItem>
                ))}
            </Select>

            <Select
                fullWidth
                value={selectedMicrophone}
                onChange={(e) => setSelectedMicrophone(e.target.value as string)}
                displayEmpty
                renderValue={(value) => (value ? audioDevices.find((d) => d.deviceId === value)?.label : 'Select Microphone')}
                sx={selectSx}
            >
                {audioDevices.map((device) => (
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