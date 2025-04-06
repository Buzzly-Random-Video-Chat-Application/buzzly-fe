import { Box } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import { useGetReviewsQuery } from '../../../../apis/reviewApi';
import { useState } from 'react';
import Button from '../../../../components/ui/Button';

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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviewData?.results.slice(0, visibleReviews).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </Box>

            <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button
                    category="primary"
                    size="small"
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