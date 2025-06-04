import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { LiveTvRounded, ConnectedTvRounded } from '@mui/icons-material'
import { useGetLivestreamStatisticsQuery } from '@apis/statisticApi'

const StatisticSection = () => {
    const { data: livestreamStatistics } = useGetLivestreamStatisticsQuery()
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            gap: '2rem',
            width: '100%',
        }}>
            <StatisticsCard
                color="dark"
                icon={<LiveTvRounded fontSize="medium" />}
                title="All Livestreams"
                count={livestreamStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "500",
                    amount: livestreamStatistics?.results.total.percentage || 0,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="primary"
                icon={<ConnectedTvRounded fontSize="medium" />}
                title="Current Livestreams"
                count={livestreamStatistics?.results.live.quantity || 0}
                percentage={{
                    color: "600",
                    amount: livestreamStatistics?.results.live.percentage || 0,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticSection