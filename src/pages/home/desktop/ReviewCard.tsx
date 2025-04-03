import { Box, Divider, Typography } from '@mui/material';
import { StarRateRounded, StarOutlineRounded, StarHalfRounded } from '@mui/icons-material';

interface ReviewCardProps {
    name: string;
    rating: number;
    review: string;
}

const ReviewCard = ({ name, rating, review }: ReviewCardProps) => {
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
                ":hover": {
                    boxShadow: '10px 10px 0px 0px #191A23',
                    transform: 'translateY(-5px)'
                }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <Box sx={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'primary.500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '3px 3px 0px 0px #191A23'
                }} />
                <Box>
                    <Typography variant='body1' sx={{ fontWeight: 700 }}>{name}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <Box key={index}>
                                {rating >= item ? <StarRateRounded sx={{ color: 'yellow.500' }} /> : rating >= item - 0.5 ? <StarHalfRounded sx={{ color: 'yellow.500' }} /> : <StarOutlineRounded sx={{ color: 'yellow.500' }} />}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ marginY: '20px', backgroundColor: 'dark.500' }} />
            <Typography variant='body2'>{review}</Typography>
        </Box>
    )
}

export default ReviewCard