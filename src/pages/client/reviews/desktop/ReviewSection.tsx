import { Box } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import { useGetReviewsQuery } from '../../../../apis/reviewApi';
import Button from '../../../../components/ui/Button';
import { useState } from 'react';

const ReviewSection = () => {
    const { data: reviewData } = useGetReviewsQuery({});
    const [visibleReviews, setVisibleReviews] = useState(6);

    const handleLoadMore = () => {
        setVisibleReviews((prev) => prev + 6);
    };

    const totalReviews = reviewData?.totalResults || 0;
    const hasMore = visibleReviews < totalReviews;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {reviewData?.results.slice(0, visibleReviews).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </Box>
            <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Button
                    category="primary"
                    size="medium"
                    width='auto'
                    shape="square"
                    onClick={handleLoadMore}
                    disabled={!hasMore}
                >
                    Load More
                </Button>
            </Box>
        </Box>
    );
};

export default ReviewSection;