import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { GroupRounded, Man2Rounded, Woman2Rounded } from '@mui/icons-material'
import { useGetUserStatisticsQuery } from '@apis/statisticApi'

const StatisticSection = () => {
    const { data: userStatistics } = useGetUserStatisticsQuery()
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            gap: '2rem',
            width: '100%',
        }}>
            <StatisticsCard
                color="dark"
                icon={<GroupRounded fontSize="medium" />}
                title="All Users"
                count={userStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "500",
                    amount: userStatistics?.results.total.percentage || 0,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="primary"
                icon={<Man2Rounded fontSize="medium" />}
                title="Male Users"
                count={userStatistics?.results.male.quantity || 0}
                percentage={{
                    color: "600",
                    amount: userStatistics?.results.male.percentage || 0,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="red"
                icon={<Woman2Rounded fontSize="medium" />}
                title="Female Users"
                count={userStatistics?.results.female.quantity || 0}
                percentage={{
                    color: "300",
                    amount: userStatistics?.results.female.percentage || 0,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticSection