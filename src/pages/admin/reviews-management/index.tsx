import { Box } from "@mui/material"
import StatisticsCard from "./components/StatisticsCard"
import { ReportProblemRounded, ThumbUpOffAltRounded } from "@mui/icons-material"
import ReviewsTable from "./components/ReviewsTable"
import { useGetReviewsQuery } from "../../../apis/reviewApi"
import { useGetUsersQuery } from "../../../apis/userApi"
import DashboardSumaryReviewCard from "../../../components/DashboardSumaryReviewCard"
import AdminTopBar from '../../../components/AdminTopBar'

const ReviewsManagament = () => {
    const { data: reviews } = useGetReviewsQuery({})
    const { data: users } = useGetUsersQuery({})
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
                        count={281}
                        percentage={{
                            color: "500",
                            amount: 55,
                            label: "than lask week",
                        }}
                    />
                    <StatisticsCard
                        color="primary"
                        icon={<ReportProblemRounded fontSize="medium" />}
                        title="Report Reviews"
                        count={281}
                        percentage={{
                            color: "600",
                            amount: 55,
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

export default ReviewsManagament