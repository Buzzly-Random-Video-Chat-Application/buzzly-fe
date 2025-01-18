import { Box } from '@mui/material'
import ImageScrollInfinity from './ImageScrollInfinity'
import WaitingConnectionBox from './WaitingConnectionBox'

const WaitingConnectionCard = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: '10px'
        }}>
            <WaitingConnectionBox />
            <ImageScrollInfinity />
        </Box>
    )
}

export default WaitingConnectionCard
