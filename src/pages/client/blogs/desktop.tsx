import { Box } from '@mui/material'
import TheMostOutstandingBlog from './desktop/TheMostOutstandingBlog'
import BlogContent from './desktop/BlogContent'

const BlogsDesktop = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            px: '100px',
            py: '50px',
            gap: '40px'
        }}>
            <TheMostOutstandingBlog />
            <BlogContent />
        </Box>
    )
}

export default BlogsDesktop