import SumaryCard from './components/SumaryCard'
import ReviewSection from './mobile/ReviewSection'
import { Box } from '@mui/material'

const ReviewsMobile = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginX: '10px',
            marginY: '30px',
            gap: '40px'
        }}>
            <SumaryCard />
            <ReviewSection />
        </Box>
    )
}

export default ReviewsMobile