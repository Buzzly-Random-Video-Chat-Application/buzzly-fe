import AdminTopBar from "@components/AdminTopBar"
import { Box } from "@mui/material"
import StatisticSection from "./components/StatisticSection"
import FeedbackCardSection from "./components/FeedbackCardSection"
import { useGetFeedbacksQuery } from "@apis/feedbackApi"

const FeedbacksManagement = () => {
    const { data: feedbacks } = useGetFeedbacksQuery({});

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
            <StatisticSection />
            <FeedbackCardSection feedbacks={feedbacks?.results || []} />
        </Box>
    )
}

export default FeedbacksManagement