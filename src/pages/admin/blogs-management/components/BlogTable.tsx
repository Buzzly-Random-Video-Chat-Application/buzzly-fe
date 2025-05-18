import React, { useState } from 'react';
import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Pagination,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    MenuProps,
    styled,
    alpha,
    ListItemIcon,
    TableBody,
    Button,
} from '@mui/material';
import { Search, MoreVert, Visibility, Edit, Delete, AddCircleOutlineRounded, FilePresentRounded } from '@mui/icons-material';
import PopupModal from '@components/PopupModal';
import toast from 'react-hot-toast';
import { useDeleteBlogMutation } from '@apis/blogApi';

interface BlogTableProps {
    blogs: IBlog[] | undefined;
    setActiveTabProp: (tab: string) => void;
    setSelectedBlogProp: (blog: IBlog | null) => void;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 100,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            fontSize: 16,
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

const BlogTable = ({ blogs = [], setActiveTabProp, setSelectedBlogProp }: BlogTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [deleteBlog] = useDeleteBlogMutation();

    const rowsPerPage = 5;

    const filteredBlogs = blogs.filter((blog) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            blog.title.toLowerCase().includes(searchLower) ||
            blog.author.name.toLowerCase().includes(searchLower) ||
            blog.label.toLowerCase().includes(searchLower)
        );
    });

    const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);
    const paginatedBlogs = filteredBlogs.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, blog: IBlog) => {
        setAnchorEl(event.currentTarget);
        setSelectedBlogId(blog?.id);
        setSelectedBlogProp(blog);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setOpenDeleteModal(true);
        setAnchorEl(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedBlogId) {
            toast.error('No blog selected');
            return;
        }

        try {
            // Implement your delete mutation
            await deleteBlog(selectedBlogId).unwrap();
            toast.success('Blog deleted successfully');
            setOpenDeleteModal(false);
            handleMenuClose();
        } catch (error) {
            toast.error('Error deleting blog');
            console.error('Error deleting blog:', error);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false);
        handleMenuClose();
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white.50',
                            bgcolor: 'dark.500',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                            border: '1px solid #F0F1F2',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            '&:hover': {
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                        onClick={() => setActiveTabProp('ADD')}
                        startIcon={<AddCircleOutlineRounded />}
                    >
                        Add New Blog
                    </Button>
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'dark.500',
                            bgcolor: 'primary.500',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                            border: '1px solid #F0F1F2',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            '&:hover': {
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                        onClick={() => setActiveTabProp('ADD_BY_CSV')}
                        startIcon={<FilePresentRounded />}
                    >
                        Add Blogs By CSV
                    </Button>
                </Box>
                <TextField
                    placeholder="Search blogs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        flex: 1,
                        maxWidth: { xs: '100%', md: 300 },
                        '& .MuiInputBase-root': {
                            padding: '10px 20px 10px 8px',
                            borderRadius: '8px',
                            fontSize: 16,
                        },
                        '& .MuiInputBase-input': {
                            padding: '2px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray.200',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray.400',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'dark.500',
                            borderWidth: 1,
                        },
                    }}
                />
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, flex: 1 }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Author</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Label</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Updated At</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Deleted At</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBlogs.length > 0 ? (
                            paginatedBlogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: '100px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {blog.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={blog.image || ''}
                                                alt={blog.title}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    flex: 1,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {blog.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={blog.author.avatar || ''}
                                                alt={blog.author.name}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '150px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {blog.author.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: '100px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {blog.label}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: '100px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: '100px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: '100px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {blog.deleteAt ?
                                                new Date(blog.updatedAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })
                                                :
                                                '-'
                                            }
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: blog.isPinned ? '#4caf50' : '#bdbdbd',
                                                }}
                                            />
                                            <Typography variant="body2">
                                                {blog.isPinned ? 'Pinned' : 'Normal'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <IconButton
                                            aria-controls={anchorEl ? 'blog-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorEl ? 'true' : undefined}
                                            onClick={(event) => handleMenuOpen(event, blog)}
                                        >
                                            <MoreVert />
                                        </IconButton>
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
            <StyledMenu
                id="blog-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'blog-menu-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setActiveTabProp('VIEW')}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">View</Typography>
                </MenuItem>
                <MenuItem onClick={() => setActiveTabProp('EDIT')}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>
            </StyledMenu>
            <PopupModal
                open={openDeleteModal}
                onClose={handleDeleteCancel}
                stage="delete"
                title="Delete Blog"
                message="Are you sure you want to delete this blog? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
            />
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        siblingCount={1}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: '14px',
                            },
                            '& .Mui-selected': {
                                bgcolor: '#000',
                                color: '#fff',
                                '&:hover': { bgcolor: '#333' },
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default BlogTable;