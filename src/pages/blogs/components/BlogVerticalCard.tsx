import { useNavigate } from 'react-router-dom';
import { IBlog } from '../../../types/app'
import { Box, Typography } from '@mui/material'

interface BlogVerticalCardProps {
    blog: IBlog
}

const BlogVerticalCard = ({ blog }: BlogVerticalCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${blog.label.toLowerCase().replace(/\s+/g, '-')}/${blog.title.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.5s ease',
            ":hover": {
                transform: 'scale(1.02)',
            }
        }} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick();
        }}>
            <Box component={'img'} src={blog.image} sx={{
                width: '100%',
                height: '250px',
                borderRadius: '20px',
                objectFit: 'cover',
            }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                bgcolor: 'dark.500',
                padding: '30px',
                gap: '10px',
                borderRadius: '20px',
                height: '300px',
            }}>
                {/* Tag */}
                <Typography variant='body1' color='white.50'>{blog.label}</Typography>
                {/* Label */}
                <Typography variant='h4' color='primary.500'>{blog.title}</Typography>
                {/* Content */}
                <Typography sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'white.50',
                    WebkitLineClamp: { xs: 6, sm: 4 },
                }}>
                    {blog.description}
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogVerticalCard