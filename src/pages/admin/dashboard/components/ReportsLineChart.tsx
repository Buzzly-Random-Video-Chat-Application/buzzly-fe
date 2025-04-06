import { Box, Typography, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2'; // Thay Bar bằng Line
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement, // Thêm PointElement cho biểu đồ đường
    LineElement,  // Thêm LineElement cho biểu đồ đường
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ReportsLineChartProps {
    color: 'primary' | 'dark' | 'light' | 'black' | 'white' | 'gray' | 'green' | 'red' | 'yellow' | 'blue';
    title: string;
    description: string;
    date: string;
    chart: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        };
    };
}

const ReportsLineChart = ({ color = 'primary', title, description, date, chart }: ReportsLineChartProps) => {
    const chartData = {
        labels: chart.labels,
        datasets: [
            {
                label: chart.datasets.label,
                data: chart.datasets.data,
                tension: 0.4, // Độ cong của đường
                borderWidth: 2, // Độ dày đường
                borderColor: "rgba(255, 255, 255, 0.8)", // Màu đường
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Màu điểm
                pointRadius: 4, // Kích thước điểm
                pointHoverRadius: 6, // Kích thước điểm khi hover
                fill: false, // Không tô màu dưới đường
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        interaction: {
            intersect: false,
            mode: "index" as const,
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5],
                    color: "rgba(255, 255, 255, .2)",
                },
                ticks: {
                    display: true,
                    color: "#f8f9fa",
                    padding: 10,
                    font: {
                        size: 14,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        lineHeight: 2,
                    },
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5],
                    color: "rgba(255, 255, 255, .2)",
                },
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 500,
                    beginAtZero: true,
                    padding: 10,
                    font: {
                        size: 14,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        lineHeight: 2,
                    },
                    color: "#fff",
                },
            },
        },
    };

    return (
        <Box sx={{
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            width: '100%',
            position: 'relative',
            pt: '30vh',
            pb: '1rem',
            px: '2rem',
            border: '1px solid #F0F1F2',
        }}>
            <Box sx={{
                bgcolor: `${color}.500`,
                borderRadius: '8px',
                height: '30vh',
                width: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '26%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem 1rem',
            }}>
                <Line data={chartData} options={chartOptions} />
            </Box>

            {/* Tiêu đề và mô tả */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ color: '#191A23', fontWeight: 600 }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                        {description}
                    </Typography>
                    {description.includes('increase') && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: `${color}.500`,
                                fontWeight: 500,
                            }}
                        >
                            {description.match(/\+\d+%/)?.[0]}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Divider */}
            <Divider
                sx={{
                    flexShrink: 0,
                    borderTop: '0px solid rgba(0, 0, 0, 0.12)',
                    borderRight: '0px solid rgba(0, 0, 0, 0.12)',
                    borderLeft: '0px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: 'transparent',
                    height: '0.0625rem',
                    margin: '1rem 0px',
                    borderBottom: 'none',
                    opacity: 0.25,
                    backgroundImage:
                        'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important',
                }}
            />

            {/* Thời gian cập nhật */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>
                    {date}
                </Typography>
            </Box>
        </Box>
    );
};

export default ReportsLineChart;