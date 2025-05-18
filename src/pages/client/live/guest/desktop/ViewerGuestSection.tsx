import { RemoveRedEyeRounded } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

interface ViewerGuestSectionProps {
    viewerCount: number;
    avatars: string[];
}

const ViewerGuestSection = ({ viewerCount, avatars }: ViewerGuestSectionProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'dark.500',
                borderRadius: '10px',
                padding: '10px',
                position: 'relative',
                gap: '10px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'white.50',
                    bgcolor: 'dark.100',
                    padding: '2px 6px',
                    borderRadius: '30px',
                    position: 'sticky',
                    left: 10,
                    zIndex: 1,
                }}
            >
                <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '12px !important' }} />
                <Typography sx={{ fontSize: '12px !important', fontWeight: 600 }}>
                    {viewerCount}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '10px',
                    flex: 1,
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    borderRadius: '100px',
                }}
            >
                {avatars.map((src, index) => (
                    <Avatar
                        key={index}
                        src={src}
                        sx={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ViewerGuestSection;