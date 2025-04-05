import { Box, Typography } from '@mui/material';
import StarRateRounded from '@mui/icons-material/StarRateRounded';
import StarHalfRounded from '@mui/icons-material/StarHalfRounded';
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded';
import ProgressBar from '../components/ProgressBar';
import { useGetAppRatingQuery } from '../../../apis/reviewApi';

const SumaryCard = () => {
    const { data } = useGetAppRatingQuery();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: '50px',
                gap: '100px',
                backgroundColor: 'dark.500',
                borderRadius: '30px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                <Typography
                    sx={{
                        fontSize: '100px !important',
                        color: 'primary.500',
                        fontWeight: 600,
                    }}
                >
                    {data?.rating}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Box key={index}>
                            {data && data.rating >= item ? (
                                <StarRateRounded sx={{ color: 'yellow.500' }} fontSize="large" />
                            ) : data && data.rating >= item - 0.5 ? (
                                <StarHalfRounded sx={{ color: 'yellow.500' }} fontSize="large" />
                            ) : (
                                <StarOutlineRounded sx={{ color: 'yellow.500' }} fontSize="large" />
                            )}
                        </Box>
                    ))}
                </Box>
                <Typography
                    sx={{
                        fontSize: '18px !important',
                        color: 'white.50',
                        fontWeight: 400,
                    }}
                >
                    Based on {data?.reviewCount} reviews
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: '10px',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{ color: 'white.50', fontWeight: 400, fontSize: '18px !important', width: '200px' }}
                    >
                        Excellent
                    </Typography>
                    <ProgressBar progress={data?.excellent || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{ color: 'white.50', fontWeight: 400, fontSize: '18px !important', width: '200px' }}
                    >
                        Good
                    </Typography>
                    <ProgressBar progress={data?.good || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{ color: 'white.50', fontWeight: 400, fontSize: '18px !important', width: '200px' }}
                    >
                        Average
                    </Typography>
                    <ProgressBar progress={data?.average || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{ color: 'white.50', fontWeight: 400, fontSize: '18px !important', width: '200px' }}
                    >
                        Below Average
                    </Typography>
                    <ProgressBar progress={data?.belowAverage || 0} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{ color: 'white.50', fontWeight: 400, fontSize: '18px !important', width: '200px' }}
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