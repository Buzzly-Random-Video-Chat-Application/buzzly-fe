import { Avatar, Box, Divider, Typography } from '@mui/material';
import { StarRateRounded, StarOutlineRounded, StarHalfRounded } from '@mui/icons-material';
import { IReview } from '../../../../types/review';
import { useGetUserQuery } from '@apis/userApi';

interface ReviewCardProps {
    review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const { data: userData } = useGetUserQuery(review.userId, {
        skip: !review.userId,
    });
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px',
                backgroundColor: 'white.50',
                borderRadius: '45px',
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: '5px 5px 0px 0px #191A23',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '10px 10px 0px 0px #191A23',
                    transform: 'translateY(-5px)',
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <Avatar
                    src={userData?.result?.avatar}
                    alt={userData?.result?.name}
                    sx={{
                        width: '50px',
                        height: '50px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                    }}
                />
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {userData?.result?.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <Box key={index}>
                                {review && review.rating >= item ? (
                                    <StarRateRounded sx={{ color: 'yellow.500' }} />
                                ) : item && review.rating >= item - 0.5 ? (
                                    <StarHalfRounded sx={{ color: 'yellow.500' }} />
                                ) : (
                                    <StarOutlineRounded sx={{ color: 'yellow.500' }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ marginY: '20px', backgroundColor: 'dark.500' }} />
            <Typography variant="body2">{review.review}</Typography>
        </Box>
    );
};

export default ReviewCard;