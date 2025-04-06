import { Box, Typography } from '@mui/material';
import { guides } from '../../../../constants/app';
import GuideCard from './GuideCard';

const Guide = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Your First Video Chat
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {guides.map((item, index) => (
                    <GuideCard
                        key={index}
                        index={index + 1}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Guide;