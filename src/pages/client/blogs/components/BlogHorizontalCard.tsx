import { Box, Typography } from '@mui/material';
import { IBlog } from '../../../../types/blog';
import { useNavigate } from 'react-router-dom';

interface BlogHorizontalCardProps {
    blog: IBlog;
}

const BlogHorizontalCard = ({ blog }: BlogHorizontalCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${blog.label.toLowerCase().replace(/\s+/g, '-')}/${blog.title.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '10px',
            width: '100%',
            transition: 'all 0.5s ease',
            ":hover": {
                transform: 'scale(1.02)',
            }
        }} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick();
        }}>
            <Box
                component={'img'}
                src={blog.image}
                alt="blog-img"
                sx={{
                    width: '40%',
                    height: '300px',
                    borderRadius: '20px',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    bgcolor: 'dark.500',
                    padding: '30px',
                    gap: '10px',
                    borderRadius: '20px',
                    height: '300px',
                    width: '60%',
                }}
            >
                {/* Tag */}
                <Typography variant="body1" color="white.50">
                    {blog.title}
                </Typography>
                {/* Label */}
                <Typography variant="h4" color="primary.500">
                    {blog.label}
                </Typography>
                {/* Content */}
                <Typography
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: 'white.50',
                        WebkitLineClamp: 6,
                    }}
                >
                    {blog.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default BlogHorizontalCard;