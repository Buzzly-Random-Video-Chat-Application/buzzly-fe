import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import Button from '@components/ui/Button';
import { ZoomOutRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BlogStatisticSectionProps {
    blogs: IBlog[];
}

const BlogStatisticSection = ({ blogs }: BlogStatisticSectionProps) => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            width: '100%',
            p: 3,
            border: '1px solid #F0F1F2',
            mt: 2,
        }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#191A23', fontWeight: 600, mb: 2 }}>
                    Blogs List
                </Typography>
                <Button
                    category="text"
                    size="small"
                    shape="square"
                    width="auto"
                    icon={<ZoomOutRounded />}
                    onClick={() => navigate('/blogs-management')}
                >
                    See all
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #F0F1F2' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Label</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.length > 0 ? (
                            blogs.slice(0, 5).map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        {blog.id}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={blog.image || ''}
                                                alt={blog.title}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            {blog.title}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={blog.author.avatar || ''}
                                                alt={blog.author.name}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            {blog.author.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {blog.label}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: blog.isPinned ? '#4caf50' : '#bdbdbd',
                                                }}
                                            />
                                            {blog.isPinned ? 'Pinned' : 'Normal'}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No blog found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BlogStatisticSection;