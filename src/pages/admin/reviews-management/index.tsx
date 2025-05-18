import { Box } from "@mui/material"
import StatisticsCard from "./components/StatisticsCard"
import { ReportProblemRounded, ThumbUpOffAltRounded } from "@mui/icons-material"
import ReviewsTable from "./components/ReviewsTable"
import { useGetReviewsQuery } from "../../../apis/reviewApi"
import { useGetUsersQuery } from "../../../apis/userApi"
import DashboardSumaryReviewCard from "../../../components/DashboardSumaryReviewCard"
import AdminTopBar from '../../../components/AdminTopBar'
import { useGetReviewStatisticsQuery } from "@apis/statisticApi"

const FeedbacksManagament = () => {
    const { data: reviews } = useGetReviewsQuery({})
    const { data: users } = useGetUsersQuery({})
    const { data: reviewStatistics } = useGetReviewStatisticsQuery()

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
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                gap: '2rem',
                width: '100%',
            }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                    gap: '2rem',
                    width: '100%',
                }}>
                    <StatisticsCard
                        color="dark"
                        icon={<ThumbUpOffAltRounded fontSize="medium" />}
                        title="Reviews"
                        count={reviewStatistics?.results.total.quantity || 0}
                        percentage={{
                            color: "500",
                            amount: reviewStatistics?.results.total.percentage || 0,
                            label: "than lask week",
                        }}
                    />
                    <StatisticsCard
                        color="primary"
                        icon={<ReportProblemRounded fontSize="medium" />}
                        title="Report Reviews"
                        count={reviewStatistics?.results.negative.quantity || 0}
                        percentage={{
                            color: "600",
                            amount: reviewStatistics?.results.negative.percentage || 0,
                            label: "than lask week",
                        }}
                    />
                </Box>
                <DashboardSumaryReviewCard />
            </Box>

            <ReviewsTable users={users?.results} reviews={reviews?.results || []} />
        </Box>
    )
}

export default FeedbacksManagament