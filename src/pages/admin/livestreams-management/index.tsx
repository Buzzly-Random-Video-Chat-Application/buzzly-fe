import AdminTopBar from "@components/AdminTopBar"
import { Box } from "@mui/material"
import StatisticSection from "./components/StatisticSection"
import LivestreamsTable from "./components/LivestreamsTable"
import { useGetLivestreamsQuery } from "@apis/livestreamApi"

const LivestreamsManagement = () => {
    const { data: livestreams } = useGetLivestreamsQuery({})

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            padding: '2rem 1rem',
        }}>
            <AdminTopBar />
            <StatisticSection />
            <LivestreamsTable livestreams={livestreams?.results || []} />
        </Box>
    )
}

export default LivestreamsManagement