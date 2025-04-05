import { Box } from '@mui/material'
import TheMostOutstandingBlog from './mobile/TheMostOutstandingBlog'
import BlogContent from './mobile/BlogContent'

const BlogsMobile = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginX: '10px',
            marginY: '30px',
            gap: '40px'
        }}>
            <TheMostOutstandingBlog />
            <BlogContent />
        </Box>
    )
}

export default BlogsMobile