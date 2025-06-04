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
import { useGetConnectionsQuery } from "@apis/connectionApi";
import { useGetLivestreamsQuery } from "@apis/livestreamApi";
import ConnectionStatisticSection from "./components/ConnectionStatisticSection";
import LivestreamStatisticSection from "./components/LivestreamStatisticSection";

const Dashboard = () => {
    const { data: reviews } = useGetReviewsQuery({})
    const { data: users } = useGetUsersQuery({})
    const { data: blogs } = useGetBlogsQuery({})
    const { data: connections } = useGetConnectionsQuery({})
    const { data: livestreams } = useGetLivestreamsQuery({})

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
            <ConnectionStatisticSection connections={connections?.results || []} />
            <LivestreamStatisticSection livestreams={livestreams?.results || []} />
        </Box>
    )
}

export default Dashboard