import { Box, Typography } from '@mui/material'
import StarRateRounded from '@mui/icons-material/StarRateRounded'
import StarHalfRounded from '@mui/icons-material/StarHalfRounded'
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded'
import ProgressBar from './ProgressBar'

const SumaryCard = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '50px',
            gap: '100px',
            backgroundColor: 'dark.500',
            borderRadius: '30px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
            }}>
                <Typography sx={{
                    fontSize: '100px !important',
                    color: 'primary.500',
                    fontWeight: 600,
                }}>
                    4.5
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Box key={index}>
                            {4.5 >= item ? <StarRateRounded sx={{ color: 'yellow.500' }} fontSize='large' /> : 4.5 >= item - 0.5 ? <StarHalfRounded sx={{ color: 'yellow.500' }} fontSize='large' /> : <StarOutlineRounded sx={{ color: 'yellow.500' }} fontSize='large' />}
                        </Box>
                    ))}
                </Box>
                <Typography sx={{
                    fontSize: '18px !important',
                    color: 'white.50',
                    fontWeight: 400,
                }}>
                    Based on 100.000 reviews
                </Typography>
            </Box>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                gap: '10px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Typography sx={{
                        color: 'white.50',
                        fontWeight: 400,
                        fontSize: '18px !important',
                        width: '200px'
                    }}>Excellent</Typography>
                    <ProgressBar progress={80} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Typography sx={{
                        color: 'white.50',
                        fontWeight: 400,
                        fontSize: '18px !important',
                        width: '200px'
                    }}>Good</Typography>
                    <ProgressBar progress={20} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Typography sx={{
                        color: 'white.50',
                        fontWeight: 400,
                        fontSize: '18px !important',
                        width: '200px'
                    }}>Average</Typography>
                    <ProgressBar progress={18} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Typography sx={{
                        color: 'white.50',
                        fontWeight: 400,
                        fontSize: '18px !important',
                        width: '200px'
                    }}>Below Average</Typography>
                    <ProgressBar progress={18} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Typography sx={{
                        color: 'white.50',
                        fontWeight: 400,
                        fontSize: '18px !important',
                        width: '200px'
                    }}>Poor</Typography>
                    <ProgressBar progress={10} />
                </Box>
            </Box>
        </Box>
    )
}

export default SumaryCard