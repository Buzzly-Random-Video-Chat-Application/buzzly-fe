import { Box, Typography } from '@mui/material'
import { Reviews as Data } from '../../../constants/app'
import ReviewCard from './ReviewCard'
import Button from '../../../components/ui/Button'

const Reviews = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant="h3" sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Reviews
                </Typography>
                <Typography>
                    See what our users are saying about their experiences. Your story could<br />be next—join the conversation today!
                </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '50px', gap: '20px' }}>
                {Data.map((item, index) => (
                    <ReviewCard key={index} name={item.name} rating={item.rating} review={item.review} />
                ))}
            </Box>
            <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Button
                    shape="square"
                    category="contained"
                    width='auto'
                    size='medium'
                    onClick={() => window.location.href = '/reviews'}>
                    See all reviews
                </Button>
            </Box>
        </Box>
    )
}

export default Reviews