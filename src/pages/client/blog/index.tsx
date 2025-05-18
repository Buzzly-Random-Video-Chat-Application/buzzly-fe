import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import BlogDetailComponent from './components/BlogDetail';
import { useGetBlogQuery } from '@apis/blogApi';

const BlogDetail = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { data: blogs, error, isLoading } = useGetBlogQuery(blogId || '');

    // Handle loading state
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="textSecondary">
                    Loading blog...
                </Typography>
            </Box>
        );
    }

    // Handle error state
    if (error || !blogs?.result) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="error">
                    Failed to load blog. Please try again later.
                </Typography>
            </Box>
        );
    }

    const blog = blogs.result;
    return (
        <BlogDetailComponent blog={blog} />
    );
};

export default BlogDetail;