import { Box } from '@mui/material'
import StatisticsCard from './StatisticsCard'
import { MarkEmailReadRounded, MailLockRounded, AllInboxRounded } from '@mui/icons-material'
import { useGetFeedbackStatisticsQuery } from '@apis/statisticApi'

const StatisticSection = () => {
    const { data: feedbackStatistics } = useGetFeedbackStatisticsQuery()
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            gap: '2rem',
            width: '100%',
        }}>
            <StatisticsCard
                color="dark"
                icon={<AllInboxRounded fontSize="medium" />}
                title="All Mail Feedbacks"
                count={feedbackStatistics?.results.total.quantity || 0}
                percentage={{
                    color: "500",
                    amount: feedbackStatistics?.results.total.percentage || 0,
                    label: "than lask week",
                }}
            />

            <StatisticsCard
                color="red"
                icon={<MailLockRounded fontSize="medium" />}
                title="Processing Mail Feedbacks"
                count={feedbackStatistics?.results.processing.quantity || 0}
                percentage={{
                    color: "600",
                    amount: feedbackStatistics?.results.processing.percentage || 0,
                    label: "than lask week",
                }}
            />

            <StatisticsCard
                color="primary"
                icon={<MarkEmailReadRounded fontSize="medium" />}
                title="Resolved Mail Feedbacks"
                count={feedbackStatistics?.results.resolved.quantity || 0}
                percentage={{
                    color: "600",
                    amount: feedbackStatistics?.results.resolved.percentage || 0,
                    label: "than lask week",
                }}
            />
        </Box>
    )
}

export default StatisticSection