import { RemoveRedEyeRounded } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

interface ViewerHostSectionProps {
    viewerCount: number;
    avatars: string[];
}

const ViewerHostSection = ({ viewerCount, avatars }: ViewerHostSectionProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'dark.700',
                borderRadius: '8px',
                padding: '8px',
                gap: '8px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'white.50',
                    bgcolor: 'dark.100',
                    padding: '2px 6px',
                    borderRadius: '20px',
                }}
            >
                <RemoveRedEyeRounded sx={{ fontSize: '10px' }} />
                <Typography sx={{ fontSize: '10px', fontWeight: 600 }}>{viewerCount}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '8px',
                    flex: 1,
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {avatars.map((src, index) => (
                    <Avatar
                        key={index}
                        src={src}
                        sx={{
                            width: '28px',
                            height: '28px',
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ViewerHostSection;