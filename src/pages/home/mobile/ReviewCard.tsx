import { Box, Typography } from '@mui/material';
import { StarRateRounded, StarOutlineRounded, StarHalfRounded } from '@mui/icons-material';

interface ReviewCardProps {
    index: number;
    name: string;
    rating: number;
    review: string;
}

const ReviewCard = ({ index, name, rating, review }: ReviewCardProps) => {
    return (
        <Box key={index} sx={{
            padding: '20px',
            backgroundColor: 'white.50',
            borderRadius: '25px',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '3px 3px 0px 0px #191A23'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Box sx={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'primary.500'
                }} />
                <Box>
                    <Typography variant='body1' sx={{ fontWeight: 700 }}>{name}</Typography>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            rating >= item ? <StarRateRounded sx={{ color: 'yellow.500' }} /> :
                                rating >= item - 0.5 ? <StarHalfRounded sx={{ color: 'yellow.500' }} /> :
                                    <StarOutlineRounded sx={{ color: 'yellow.500' }} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Typography variant='body2' sx={{ mt: 2 }}>{review}</Typography>
        </Box>
    );
};

export default ReviewCard;