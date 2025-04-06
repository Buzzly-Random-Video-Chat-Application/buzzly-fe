import { Box, Typography } from '@mui/material'
import BlogVerticalCard from '../components/BlogVerticalCard'
import { blogs } from '../../../../constants/app'

const BlogContent = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            gap: '20px',
        }}>
            <Typography variant='h3'>Blogs</Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '100%',
            }}>
                {blogs.map((blog, index) => (
                    <BlogVerticalCard key={index} blog={blog} />
                ))}
            </Box>
        </Box>
    )
}

export default BlogContent