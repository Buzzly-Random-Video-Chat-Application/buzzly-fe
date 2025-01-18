import { Box } from '@mui/material'
import LiveBanner from './components/LiveBanner'
import LiveContent from './components/LiveContent'
import Trending from './components/Trending'

const Live = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
        }}>
            <LiveBanner />
            <Trending />
            <LiveContent />
        </Box>
    )
}

export default Live