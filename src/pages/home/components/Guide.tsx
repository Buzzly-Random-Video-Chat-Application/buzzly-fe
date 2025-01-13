import { Box, Typography } from '@mui/material'
import GuideCard from './GuideCard'
import { GuideCardData } from '../../../constants/app'

const Guide = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant="h3" sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Your First Video Chat
                </Typography>
                <Typography>
                    A simple guide to starting your<br />first random video chat
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px' }}>
                {GuideCardData.map((item, index) => (
                    <GuideCard key={index} index={index + 1} title={item.title} description={item.description} />
                ))}
            </Box>
        </Box>
    )
}

export default Guide