import { Box } from "@mui/material"
import { useGetReviewsQuery } from "../../../apis/reviewApi";
import ReviewsStatisticCard from "./components/ReviewsStatisticCard";
import { useGetUsersQuery } from "../../../apis/userApi";
import UserStatisticCard from "./components/UserStatisticCard";
import StatisticCardSection from "./components/StatisticCardSection";
import ChartSection from "./components/ChartSection";
import AdminTopBar from "../../../components/AdminTopBar";

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
            <AdminTopBar />
            <StatisticCardSection />
            <ChartSection />
            <ReviewsStatisticCard reviews={reviews?.results || []} users={users?.results} />
            <UserStatisticCard users={users?.results || []} />
        </Box>
    )
}

export default Dashboard