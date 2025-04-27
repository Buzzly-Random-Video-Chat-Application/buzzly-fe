import { Box } from "@mui/material"
import { useGetReviewsQuery } from "../../../apis/reviewApi";
import ReviewsStatisticSection from "./components/ReviewsStatisticSection";
import { useGetUsersQuery } from "../../../apis/userApi";
import UserStatisticSection from "./components/UserStatisticSection";
import StatisticCardSection from "./components/StatisticCardSection";
import ChartSection from "./components/ChartSection";
import AdminTopBar from "../../../components/AdminTopBar";
import { useGetBlogsQuery } from "@apis/blogApi";
import BlogStatisticSection from "./components/BlogsStatisticSection";

const Dashboard = () => {
    const { data: reviews } = useGetReviewsQuery({})
    const { data: users } = useGetUsersQuery({})
    const { data: blogs } = useGetBlogsQuery({})

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
            <ReviewsStatisticSection reviews={reviews?.results || []} users={users?.results} />
            <UserStatisticSection users={users?.results || []} />
            <BlogStatisticSection blogs={blogs?.results || []} />
        </Box>
    )
}

export default Dashboard