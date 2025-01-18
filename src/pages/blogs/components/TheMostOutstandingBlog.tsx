import { Box, Typography } from '@mui/material'
import React from 'react'
import BlogHorizontalCard from './BlogHorizontalCard'

const TheMostOutstandingBlog = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            gap: '20px',
        }}>
            <Typography variant='h3'>The most outstanding</Typography>
            <BlogHorizontalCard />
        </Box>
    )
}

export default TheMostOutstandingBlog