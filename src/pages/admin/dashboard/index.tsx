import { Box } from "@mui/material"
import StatisticsCard from "./components/StatisticsCard";
import { Chair } from "@mui/icons-material"
import ReportsBarChart from "./components/ReportsBarChart";
import ReportsLineChart from "./components/ReportsLineChart";
import { useGetReviewsQuery } from "../../../apis/reviewApi";
import ReviewsStatisticCard from "./components/ReviewsStatisticCard";
import { useGetUsersQuery } from "../../../apis/userApi";
import UserStatisticCard from "./components/UserStatisticCard";

const reportsBarChartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
};

const reportsLineChartData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
};

const Dashboard = () => {
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
            {/* Statistic Card Section */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: '2rem',
                width: '100%',
            }}>
                <StatisticsCard
                    color="dark"
                    icon={<Chair fontSize="medium" />}
                    title="Bookings"
                    count={281}
                    percentage={{
                        color: "500",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
                <StatisticsCard
                    color="primary"
                    icon={<Chair fontSize="medium" />}
                    title="Bookings"
                    count={281}
                    percentage={{
                        color: "600",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
                <StatisticsCard
                    color="light"
                    icon={<Chair fontSize="medium" />}
                    title="Bookings"
                    count={281}
                    percentage={{
                        color: "700",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
                <StatisticsCard
                    color="dark"
                    icon={<Chair fontSize="medium" />}
                    title="Bookings"
                    count={281}
                    percentage={{
                        color: "500",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
            </Box>

            {/* Report Bar Chart */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                gap: '2rem',
                width: '100%',
                marginTop: '2rem',
            }}>
                <ReportsBarChart
                    color="dark"
                    title="website views"
                    description="Last Campaign Performance"
                    date="campaign sent 2 days ago"
                    chart={reportsBarChartData}
                />
                <ReportsLineChart
                    color="green"
                    title="website views"
                    description="Last Campaign Performance"
                    date="campaign sent 2 days ago"
                    chart={reportsLineChartData}
                />
            </Box>

            <Box sx={{ width: '100%', marginTop: '2rem' }}>
                <ReviewsStatisticCard reviews={reviews?.results || []} users={users?.results} />
            </Box>

            <Box sx={{ width: '100%', marginTop: '2rem' }}>
                <UserStatisticCard users={users?.results || []} />
            </Box>
        </Box>
    )
}

export default Dashboard