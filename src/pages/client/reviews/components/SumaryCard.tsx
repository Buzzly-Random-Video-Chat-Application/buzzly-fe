import { Box, Typography } from '@mui/material';
import StarRateRounded from '@mui/icons-material/StarRateRounded';
import StarHalfRounded from '@mui/icons-material/StarHalfRounded';
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded';
import ProgressBar from '../components/ProgressBar';
import { useGetAppRatingQuery } from '@apis/reviewApi';
import { isMobile } from 'react-device-detect';

const SumaryCard = () => {
    const { data } = useGetAppRatingQuery();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            width: '100%',
            padding: { xs: '20px', md: '50px' },
            gap: { xs: '20px', md: '100px' },
            backgroundColor: 'dark.500',
            borderRadius: { xs: '20px', md: '30px' },
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: '10px',
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '60px !important', md: '100px !important' },
                        color: 'primary.500',
                        fontWeight: 600,
                    }}
                >
                    {data?.rating}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: { xs: '5px', md: '10px' },
                    }}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Box key={index}>
                            {data && data.rating >= item ? (
                                <StarRateRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'medium' : 'large'}
                                />
                            ) : data && data.rating >= item - 0.5 ? (
                                <StarHalfRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'medium' : 'large'}
                                />
                            ) : (
                                <StarOutlineRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'medium' : 'large'}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
                <Typography
                    sx={{
                        fontSize: { xs: '14px !important', md: '18px !important' },
                        color: 'white.50',
                        fontWeight: 400,
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    Based on {data?.reviewCount} reviews
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: { xs: 'unset', md: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: '10px',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '14px !important', md: '18px !important' },
                            width: '200px',
                        }}
                    >
                        Excellent
                    </Typography>
                    <ProgressBar progress={data?.excellent || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '14px !important', md: '18px !important' },
                            width: '200px',
                        }}
                    >
                        Good
                    </Typography>
                    <ProgressBar progress={data?.good || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '14px !important', md: '18px !important' },
                            width: '200px',
                        }}
                    >
                        Average
                    </Typography>
                    <ProgressBar progress={data?.average || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '14px !important', md: '18px !important' },
                            width: '200px',
                        }}
                    >
                        Below Average
                    </Typography>
                    <ProgressBar progress={data?.belowAverage || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '14px !important', md: '18px !important' },
                            width: '200px',
                        }}
                    >
                        Poor
                    </Typography>
                    <ProgressBar progress={data?.poor || 0} />
                </Box>
            </Box>
        </Box>
    );
};

export default SumaryCard;