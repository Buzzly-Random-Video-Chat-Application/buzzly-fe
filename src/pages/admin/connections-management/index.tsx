import AdminTopBar from "@components/AdminTopBar"
import { Box } from "@mui/material"
import StatisticSection from "./components/StatisticSection"
import ConnectionsTable from "./components/ConnectionsTable"
import { useGetConnectionsQuery } from "@apis/connectionApi"

const ConnectionsManagement = () => {
    const { data: connections } = useGetConnectionsQuery({});

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
            <ConnectionsTable connections={connections?.results || []} />
        </Box>
    )
}

export default ConnectionsManagement