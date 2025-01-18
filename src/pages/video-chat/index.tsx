import { Box } from '@mui/material'
import WaitingConnectionCard from './components/WaitingConnectionCard'
// import ConnectingCard from './components/ConnectingCard'

const VideoChat = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            width: '100%',
            paddingX: '10px',
            paddingY: '50px',
        }}>
            <WaitingConnectionCard />
            {/* <ConnectingCard /> */}
        </Box>
    )
}

export default VideoChat