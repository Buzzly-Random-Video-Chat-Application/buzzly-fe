import {
    Box,
    Typography,
} from '@mui/material';
import StarRateRounded from '@mui/icons-material/StarRateRounded';
import StarHalfRounded from '@mui/icons-material/StarHalfRounded';
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded';
import { isMobile } from 'react-device-detect';
import { useGetAppRatingQuery } from '../apis/reviewApi';

const DashboardSumaryReviewCard = () => {
    const { data } = useGetAppRatingQuery();
    const ProgressBar = ({ progress }: { progress: number }) => {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: 'primary.500',
                        borderRadius: '8px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transition: 'width 1s ease',
                    }}
                />
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                width: '100%',
                padding: { xs: '15px', md: '20px' }, // Giảm padding để nhỏ gọn
                gap: { xs: '15px', md: '30px' }, // Giảm gap
                backgroundColor: 'dark.500',
                borderRadius: { xs: '12px', md: '16px' }, // Giảm borderRadius
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Thêm bóng nhẹ
            }}
        >
            {/* Phần rating và số sao */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: '8px', // Giảm gap
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '40px !important', md: '60px !important' }, // Giảm fontSize
                        color: 'primary.500',
                        fontWeight: 600,
                        lineHeight: 1,
                    }}
                >
                    {data?.rating || '0.0'}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: { xs: '3px', md: '5px' }, // Giảm gap giữa các ngôi sao
                    }}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Box key={index}>
                            {data && data.rating >= item ? (
                                <StarRateRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'small' : 'medium'} // Giảm kích thước ngôi sao
                                />
                            ) : data && data.rating >= item - 0.5 ? (
                                <StarHalfRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'small' : 'medium'}
                                />
                            ) : (
                                <StarOutlineRounded
                                    sx={{ color: 'yellow.500' }}
                                    fontSize={isMobile ? 'small' : 'medium'}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
                <Typography
                    sx={{
                        fontSize: { xs: '12px !important', md: '14px !important' }, // Giảm fontSize
                        color: 'white.50',
                        fontWeight: 400,
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    Based on {data?.reviewCount || 0} reviews
                </Typography>
            </Box>

            {/* Phần thanh tiến trình */}
            <Box
                sx={{
                    flex: { xs: 'unset', md: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: '8px', // Giảm gap
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Typography
                        sx={{
                            color: 'white.50',
                            fontWeight: 400,
                            fontSize: { xs: '12px !important', md: '14px !important' }, // Giảm fontSize
                            width: '150px', // Giảm chiều rộng của label
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
                            fontSize: { xs: '12px !important', md: '14px !important' },
                            width: '150px',
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
                            fontSize: { xs: '12px !important', md: '14px !important' },
                            width: '150px',
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
                            fontSize: { xs: '12px !important', md: '14px !important' },
                            width: '150px',
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
                            fontSize: { xs: '12px !important', md: '14px !important' },
                            width: '150px',
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

export default DashboardSumaryReviewCard;