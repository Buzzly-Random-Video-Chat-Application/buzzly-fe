import { Box, Typography } from '@mui/material';
import TheMostOutstandingBlog from './desktop/TheMostOutstandingBlog';
import BlogContent from './desktop/BlogContent';
import { useGetBlogsQuery } from '@apis/blogApi';

const BlogsDesktop = () => {
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
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                px: '100px',
                py: '50px',
                gap: '40px',
            }}
        >
            <TheMostOutstandingBlog blogs={blogs} />
            <BlogContent blogs={blogs} />
        </Box>
    );
};

export default BlogsDesktop;