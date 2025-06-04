import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { ConnectWithoutContactRounded, DuoRounded } from '@mui/icons-material'
import { useGetConnectionStatisticsQuery } from '@apis/statisticApi'

const StatisticSection = () => {
    const { data: connectionStatistics } = useGetConnectionStatisticsQuery()
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            gap: '2rem',
            width: '100%',
        }}>
            <StatisticsCard
                color="dark"
                icon={<ConnectWithoutContactRounded fontSize="medium" />}
                title="All Connections"
                count={connectionStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "500",
                    amount: connectionStatistics?.results.total.percentage || 0,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="primary"
                icon={<DuoRounded fontSize="medium" />}
                title="Current Connections"
                count={connectionStatistics?.results.live.quantity || 0}
                percentage={{
                    color: "600",
                    amount: connectionStatistics?.results.live.percentage || 0,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticSection