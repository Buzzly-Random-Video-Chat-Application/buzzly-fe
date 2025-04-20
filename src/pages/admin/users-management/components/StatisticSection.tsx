import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { GroupRounded, Man2Rounded, Woman2Rounded } from '@mui/icons-material'

const StatisticSection = () => {
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
                count={281}
                percentage={{
                    color: "500",
                    amount: 55,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="primary"
                icon={<Man2Rounded fontSize="medium" />}
                title="Male Users"
                count={281}
                percentage={{
                    color: "600",
                    amount: 55,
                    label: "than lask week",
                }}
            />
            <StatisticsCard
                color="red"
                icon={<Woman2Rounded fontSize="medium" />}
                title="Female Users"
                count={281}
                percentage={{
                    color: "300",
                    amount: 55,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticSection