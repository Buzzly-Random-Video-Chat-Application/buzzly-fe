import { Box } from '@mui/material'
import React from 'react'
import TheMostOutstandingBlog from './components/TheMostOutstandingBlog'
import BlogContent from './components/BlogContent'

const Blogs = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '100px',
            gap: '40px'
        }}>
            <TheMostOutstandingBlog />
            <BlogContent />
        </Box>
    )
}

export default Blogs