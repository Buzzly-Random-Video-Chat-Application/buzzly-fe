import { Box, Button, Typography } from '@mui/material'
import { Reviews as Data } from '../../../constants/app'
import ReviewCard from './ReviewCard'

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
                <Button sx={{
                    backgroundColor: 'primary.500',
                    color: 'dark.500',
                    paddingX: '50px',
                    paddingY: '15px',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px 0px #191A23',
                    border: '1px solid #191A23',
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    width: 'fit-content',
                    fontSize: '20px',
                    ":hover": {
                        boxShadow: '5px 5px 0px 0px #191A23',
                        transform: 'translateY(-5px)',
                    }
                }} onClick={() => window.location.href = '/reviews'}>
                    See all reviews
                </Button>
            </Box>
        </Box>
    )
}

export default Reviews