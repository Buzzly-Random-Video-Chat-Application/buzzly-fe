import { Box, Typography } from '@mui/material';
import ReviewCard from './ReviewCard';
import Button from '@components/ui/Button';
import { isBrowser } from 'react-device-detect';
import { useGetReviewsQuery } from '@apis/reviewApi';

const Reviews = () => {
    const { data: reviewData } = useGetReviewsQuery({});
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: { xs: '20px', md: '0' } }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'center' },
                    gap: { xs: '10px', md: '40px' },
                    userSelect: 'none',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: 'h4.fontSize', md: 'h3.fontSize' },
                        textAlign: { xs: 'center', md: 'left' },
                        backgroundColor: { md: 'primary.500' },
                        borderRadius: { md: 2 },
                        padding: { md: 1 },
                        paddingX: { md: 2 },
                    }}
                >
                    Reviews
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        display: { xs: 'none', md: 'block' }, // Ẩn trên mobile
                        textAlign: 'left',
                    }}
                >
                    See what our users are saying about their experiences. Your story could<br />be next—join the conversation today!
                </Typography>
            </Box>

            {/* Review Cards */}
            <Box
                sx={{
                    display: { xs: 'flex', md: 'grid' },
                    flexDirection: { xs: 'column', md: 'unset' },
                    gridTemplateColumns: { md: 'repeat(3, 1fr)' },
                    gap: { xs: '15px', md: '20px' },
                    marginTop: { xs: '0', md: '50px' },
                }}
            >
                {reviewData?.results?.slice(0, window.innerWidth < 900 ? 2 : reviewData?.results?.length).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </Box>

            {/* Button */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: { xs: '0', md: '50px' },
                }}
            >
                <Button
                    shape="square"
                    category="primary"
                    width="auto"
                    size={isBrowser ? 'medium' : 'small'}
                    onClick={() => (window.location.href = '/reviews')}
                >
                    See all reviews
                </Button>
            </Box>
        </Box>
    );
};

export default Reviews;