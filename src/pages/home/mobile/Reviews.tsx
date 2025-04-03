import { Box, Typography } from '@mui/material';
import { Reviews as Data } from '../../../constants/app';
import ReviewCard from './ReviewCard';
import Button from '../../../components/ui/Button';

const Reviews = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Reviews
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {Data.slice(0, 2).map((item, index) => (
                    <ReviewCard
                        index={index}
                        name={item.name}
                        rating={item.rating}
                        review={item.review}
                    />
                ))}
            </Box>
            <Button
                shape="square"
                category="contained"
                width='auto'
                size='small'
                onClick={() => window.location.href = '/reviews'}
            >
                See all reviews
            </Button>
        </Box>
    );
};

export default Reviews;