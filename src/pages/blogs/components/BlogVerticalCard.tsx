import React from 'react'
import { BlogProps } from '../../../types/app'
import { Box, Typography } from '@mui/material'

interface BlogVerticalCardProps {
    blog: BlogProps
}

const BlogVerticalCard = ({ blog }: BlogVerticalCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
        }}>
            <Box component={'img'} src={blog.image} sx={{
                width: '100%',
                height: '250px',
                borderRadius: '20px',
                objectFit: 'cover',
            }} />
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
                <Typography variant='body1' color='light.500'>{blog.label}</Typography>
                {/* Label */}
                <Typography variant='h4' color='primary.500'>{blog.title}</Typography>
                {/* Content */}
                <Typography sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'light.500',
                    WebkitLineClamp: 3,
                }}>
                    {blog.description}
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogVerticalCard