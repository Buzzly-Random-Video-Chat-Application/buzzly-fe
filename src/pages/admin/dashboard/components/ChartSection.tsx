import { Box } from '@mui/material'
import ReportsBarChart from './ReportsBarChart'
import ReportsLineChart from './ReportsLineChart'

const reportsBarChartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
};

const reportsLineChartData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
};

const ChartSection = () => {
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
                chart={reportsBarChartData}
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