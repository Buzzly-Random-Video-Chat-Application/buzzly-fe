import { Box, Typography } from '@mui/material';
import BlogVerticalCard from '../components/BlogVerticalCard';
import { IBlog } from '../../../../types/blog';

interface BlogContentProps {
    blogs: IBlog[];
}

const BlogContent = ({ blogs }: BlogContentProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                gap: '20px',
            }}
        >
            <Typography variant="h3">Blogs</Typography>
            {blogs.length > 0 ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        width: '100%',
                    }}
                >
                    {blogs.map((blog, index) => (
                        <BlogVerticalCard key={blog.id || index} blog={blog} />
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    No blogs available.
                </Typography>
            )}
        </Box>
    );
};

export default BlogContent;