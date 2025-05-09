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
                padding: '10px',
            }}
        >
            <Avatar
                src={avatarSrc}
                sx={{
                    width: '38px',
                    height: '38px',
                    objectFit: 'cover',
                    marginLeft: '10px',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                        marginBottom: '4px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '2px 10px',
                            borderRadius: '6px',
                            bgcolor: 'primary.500',
                            color: 'dark.500',
                            fontSize: '12px !important',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        Host
                    </Box>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '14px !important',
                            color: 'white.50',
                        }}
                    >
                        {hostName}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={countryFlag}
                        alt="flag"
                        style={{
                            width: '16px',
                            height: '16px',
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '14px !important',
                            color: 'white.50',
                        }}
                    >
                        {country}
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: 'gray.100', height: '14px', alignSelf: 'center' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                            alignItems: 'center',
                        }}
                    >
                        <Star sx={{ color: 'yellow.500', fontSize: '16px !important' }} />
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '14px !important',
                                color: 'white.50',
                            }}
                        >
                            {rating}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HostInfo;