import { Box } from '@mui/material'
import ReportsBarChart from './ReportsBarChart'
import ReportsLineChart from './ReportsLineChart'
import { useGetWeeklyConnectionStatisticsQuery } from '@apis/statisticApi';

const reportsLineChartData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
};

const ChartSection = () => {
    const { data: weeklyConnectionStatistics } = useGetWeeklyConnectionStatisticsQuery();
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            gap: '2rem',
            width: '100%',
            marginTop: '4rem',
        }}>
            <ReportsBarChart
                color="dark"
                title="Connection statistics"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={weeklyConnectionStatistics?.results || {
                    labels: [],
                    datasets: {
                        label: "",
                        data: [],
                    },
                }}
            />
            <ReportsLineChart
                color="green"
                title="Revenue statistics"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsLineChartData}
            />
        </Box>
    )
}

export default ChartSection