import { Box } from "@mui/material"
import LiveBanner from "./mobile/LiveBanner"
import LiveContent from "./mobile/LiveContent"
import Trending from "./mobile/Trending"

const LiveMobile = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      p: 4,
      gap: 5,
    }}>
      <LiveBanner />
      <Trending />
      <LiveContent />
    </Box>
  )
}

export default LiveMobile