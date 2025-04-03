import { Box, Typography } from '@mui/material';
import { ArrowOutwardRounded } from '@mui/icons-material';

const Stories = () => {
    const stories = [
        { title: '#1 Video Chat App Worldwide', content: 'Over 1 million downloads in our first three months.' },
        { title: 'Trusted by 150+ Countries', content: 'Breaking barriers and bringing the world closer together.' },
        { title: '10 Million Chats in a Month', content: 'Redefining how people connect worldwide.' },
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Success Stories
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'dark.500',
                padding: '20px',
                borderRadius: '25px',
                gap: '20px'
            }}>
                {stories.map((story, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <Typography variant='h6' color='white.50'>{story.title}</Typography>
                        <Typography color='white.50'>{story.content}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography color='primary.500'>Read more</Typography>
                            <ArrowOutwardRounded sx={{ color: 'primary.500' }} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Stories;