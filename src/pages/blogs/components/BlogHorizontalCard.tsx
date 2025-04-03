import { Box, Typography } from '@mui/material'
import React from 'react'
import { images } from '../../../assets'

const BlogHorizontalCard = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '10px',
            width: '100%',
            maxWidth: '1500px',
        }}>
            <Box component={'img'} src={images.blog} alt='blog-img' sx={{ width: '500px', height: '300px', borderRadius: '20px' }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                bgcolor: 'dark.500',
                padding: '30px',
                gap: '10px',
                borderRadius: '20px',
                height: '300px',
            }}>
                {/* Tag */}
                <Typography variant='body1' color='white.50'>Making Friends</Typography>
                {/* Label */}
                <Typography variant='h4' color='primary.500'>Online Chat, Live Conversations: How To Find the Best Platforms</Typography>
                {/* Content */}
                <Typography sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'white.50',
                    WebkitLineClamp: 4,
                }}>
                    Explore live chat and start creating online connections with Azar Live.
                    Learn more here!Online live chat platforms are gaining traction fast.
                    They allow us to meet people worldwide, making social connections all
                    the more accessible. Azar is a leader in the online live chat space,
                    setting itself apart from many similar platforms by encouraging healthy,
                    positive, platonic relationships. Let's explore the benefits of forming
                    digital friendships and highlight features to check for in a
                    video chat platform.
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogHorizontalCard