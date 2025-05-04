import { Box, Typography } from '@mui/material';
import TheMostOutstandingBlog from './mobile/TheMostOutstandingBlog';
import BlogContent from './mobile/BlogContent';
import { useGetBlogsQuery } from '@apis/blogApi';

const BlogsMobile = () => {
    const { data, error, isLoading } = useGetBlogsQuery({});

    const blogs = data?.results || [];

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="textSecondary">
                    Loading blogs...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="error">
                    Failed to load blogs. Please try again later.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginX: '10px',
                marginY: '30px',
                gap: '40px',
            }}
        >
            <TheMostOutstandingBlog blogs={blogs} />
            <BlogContent blogs={blogs} />
        </Box>
    );
};

export default BlogsMobile;