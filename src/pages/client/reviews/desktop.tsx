import SumaryCard from './components/SumaryCard'
import ReviewSection from './desktop/ReviewSection'
import { Box } from '@mui/material'

const ReviewsDesktop = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '100px',
            gap: '100px',
        }}>
            <SumaryCard />
            <ReviewSection />
        </Box>
    )
}

export default ReviewsDesktop