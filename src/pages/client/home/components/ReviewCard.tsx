import { Avatar, Box, Divider, Typography } from '@mui/material';
import { StarRateRounded, StarOutlineRounded, StarHalfRounded } from '@mui/icons-material';
import { IReview } from '../../../../types/review';
import { useGetUserQuery } from '@apis/userApi';
import { useNavigate } from 'react-router-dom';

interface ReviewCardProps {
    review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const navigate = useNavigate();
    const { data: userData } = useGetUserQuery(review.userId, {
        skip: !review.userId,
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: { xs: '20px', md: '40px' },
                backgroundColor: 'white.50',
                borderRadius: { xs: '25px', md: '45px' },
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: { xs: '3px 3px 0px 0px #191A23', md: '5px 5px 0px 0px #191A23' },
                cursor: { md: 'pointer' },
                transition: { md: 'all 0.3s ease' },
                ':hover': {
                    boxShadow: { md: '10px 10px 0px 0px #191A23' },
                    transform: { md: 'translateY(-5px)' },
                },
            }}
            onClick={() => navigate(`/reviews`)}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: { xs: '15px', md: '20px' },
                }}
            >
                <Avatar
                    src={userData?.result?.avatar}
                    alt={userData?.result?.name}
                    sx={{
                        width: { xs: '40px', md: '50px' },
                        height: { xs: '40px', md: '50px' },
                        boxShadow: '3px 3px 0px 0px #191A23',
                    }}
                />
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {userData?.result?.name}
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
                                {review && review.rating >= item ? (
                                    <StarRateRounded sx={{ color: 'yellow.500' }} />
                                ) : review && review.rating >= item - 0.5 ? (
                                    <StarHalfRounded sx={{ color: 'yellow.500' }} />
                                ) : (
                                    <StarOutlineRounded sx={{ color: 'yellow.500' }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Divider
                sx={{
                    marginY: { xs: '10px', md: '20px' },
                    backgroundColor: 'dark.500',
                    display: { xs: 'none', md: 'block' },
                }}
            />
            <Typography variant="body2" sx={{ mt: { xs: 2, md: 0 } }}>
                {review?.review}
            </Typography>
        </Box>
    );
};

export default ReviewCard;