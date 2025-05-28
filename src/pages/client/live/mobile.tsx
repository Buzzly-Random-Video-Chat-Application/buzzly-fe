import { Box } from "@mui/material"
import LiveBanner from "./mobile/LiveBanner"
import LiveContent from "./mobile/LiveContent"
import Trending from "./mobile/Trending"

const LiveMobile = ({ livestreams }: { livestreams: ILivestreamListResponse | undefined }) => {
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
      <Trending livestreams={livestreams} />
      <LiveContent livestreams={livestreams} />
    </Box>
  )
}

export default LiveMobile