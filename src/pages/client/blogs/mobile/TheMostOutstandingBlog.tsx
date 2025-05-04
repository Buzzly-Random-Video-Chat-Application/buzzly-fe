import { Box, Typography } from '@mui/material';
import BlogVerticalCard from '../components/BlogVerticalCard';
import { IBlog } from '../../../../types/blog';

interface TheMostOutstandingBlogProps {
    blogs: IBlog[];
}

const TheMostOutstandingBlog = ({ blogs }: TheMostOutstandingBlogProps) => {
    // Chọn blog nổi bật: blog có isPinned = true, nếu không có thì lấy blog mới nhất
    const outstandingBlog = blogs.length > 0
        ? blogs.find(blog => blog.isPinned) ||
        blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        : null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                gap: '10px',
            }}
        >
            <Typography variant="h3">The most outstanding</Typography>
            {outstandingBlog ? (
                <BlogVerticalCard blog={outstandingBlog} />
            ) : (
                <Typography variant="body1" color="textSecondary">
                    No outstanding blog available.
                </Typography>
            )}
        </Box>
    );
};

export default TheMostOutstandingBlog;