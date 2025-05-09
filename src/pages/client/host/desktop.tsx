import { Box } from "@mui/material"
import HostLiveSection from "./desktop/HostLiveSection"
import Trending from "../live/desktop/Trending"
import LiveContent from "../live/desktop/LiveContent"

const LiveHostDesktop = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingX: '10px',
            paddingY: '50px',
        }}>
            <HostLiveSection />
            <Trending />
            <LiveContent />
        </Box>
    )
}

export default LiveHostDesktop