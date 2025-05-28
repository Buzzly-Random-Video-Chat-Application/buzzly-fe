import { Star } from '@mui/icons-material';
import { Avatar, Box, Divider, Typography } from '@mui/material';

interface HostInfoProps {
    hostName: string;
    country: string;
    countryFlag: string;
    rating: number;
    avatarSrc: string;
}

const HostInfo = ({ hostName, country, countryFlag, rating, avatarSrc }: HostInfoProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                padding: '8px',
            }}
        >
            <Avatar src={avatarSrc} alt="Host Avatar" sx={{ width: '32px', height: '32px', objectFit: 'cover' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: '8px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center',
                        marginBottom: '2px',
                    }}
                >
                    <Box
                        sx={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            bgcolor: 'primary.500',
                            color: 'dark.500',
                            fontSize: '10px',
                            fontWeight: 700,
                        }}
                    >
                        Host
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '12px', color: 'white.50' }}>{hostName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                    <img src={countryFlag} alt="flag" style={{ width: '14px', height: 'auto' }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '12px', color: 'white.50' }}>{country}</Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: 'gray.100', height: '12px', alignSelf: 'center' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3px', alignItems: 'center' }}>
                        <Star sx={{ color: 'yellow.500', fontSize: '14px' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '12px', color: 'white.50' }}>{rating}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HostInfo;