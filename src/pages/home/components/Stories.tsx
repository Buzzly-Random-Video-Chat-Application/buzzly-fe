import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { ArrowOutwardRounded } from '@mui/icons-material';

interface StoryCardProps {
    title: string;
    content: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, content }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Typography sx={{ color: 'light.500' }}>
            <Typography component="span" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <br />
            {content}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
            <Typography sx={{ color: 'primary.500', fontWeight: 600 }}>Read more</Typography>
            <IconButton sx={{ color: 'primary.500', ":hover": { rotate: '45deg' }, transition: 'all 0.3s' }}>
                <ArrowOutwardRounded />
            </IconButton>
        </Box>
    </Box>
);

const Stories = () => {
    const stories = [
        { title: '#1 Video Chat App Worldwide', content: 'Over 1 million downloads in our\nfirst three months. Our seamless\nexperience is connecting\nmillions daily!' },
        { title: 'Trusted by 150+ Countries', content: 'With users in over 150 countries,\nour app is breaking barriers and\nbringing the world closer\ntogether. Join our global\ncommunity today!' },
        { title: '10 Million Chats in a Month', content: 'Last month, our platform hosted\n10 million conversations\nworldwide. From casual chats to\nlasting friendships, we’re\nredefining how people connect.' },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant="h3" sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Featured Success Story
                </Typography>
                <Typography>
                    Be a part of our growing community and help us write<br />
                    the next chapter of our success story.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '50px',
                    bgcolor: 'dark.500',
                    paddingX: '50px',
                    paddingY: '30px',
                    borderRadius: '45px',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                {stories.map((story, index) => (
                    <React.Fragment key={index}>
                        <StoryCard title={story.title} content={story.content} />
                        {index < stories.length - 1 && (
                            <Divider
                                orientation="vertical"
                                sx={{
                                    bgcolor: 'light.500',
                                    height: 'auto',
                                    minHeight: '100px',
                                    marginX: '20px',
                                    alignSelf: 'stretch',
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default Stories;
