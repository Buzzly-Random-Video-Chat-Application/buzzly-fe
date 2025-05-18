import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { LiveTvRounded, ConnectWithoutContactRounded, DuoRounded, GroupAddRounded } from '@mui/icons-material'
import { useGetUserStatisticsQuery, useGetConnectionStatisticsQuery } from '@apis/statisticApi'

const StatisticCardSection = () => {
    const { data: userStatistics } = useGetUserStatisticsQuery()
    const { data: connectionStatistics } = useGetConnectionStatisticsQuery()

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: '2rem',
            width: '100%',
        }}>
            <StatisticsCard
                color="dark"
                icon={<ConnectWithoutContactRounded fontSize="medium" />}
                title="Total Connections"
                count={connectionStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "500",
                    amount: connectionStatistics?.results.total.percentage || 0,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="yellow"
                icon={<GroupAddRounded fontSize="medium" />}
                title="Users"
                count={userStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "600",
                    amount: userStatistics?.results.total.percentage || 0,
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
            <StatisticsCard
                color="light"
                icon={<LiveTvRounded fontSize="medium" />}
                title="Current Lives"
                count={0}
                percentage={{
                    color: "700",
                    amount: 0,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticCardSection