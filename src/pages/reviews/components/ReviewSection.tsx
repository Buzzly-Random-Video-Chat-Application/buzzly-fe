import { Box, Button } from '@mui/material'
import { ReviewData } from '../../../constants/app'
import ReviewCard from './ReviewCard'

const ReviewSection = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {ReviewData.map((item, index) => (
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
                }}>
                    Load More
                </Button>
            </Box>
        </Box>
    )
}

export default ReviewSection