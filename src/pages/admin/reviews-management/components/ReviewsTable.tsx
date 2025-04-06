import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Typography,
    Avatar,
} from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import { IReview } from '../../../../types/review';
import { IUser } from '../../../../types/user';
import { getUserById } from '../../../../utils';

interface ReviewsTableProps {
    reviews: IReview[];
    users: IUser[];
}

const ReviewsTable = ({ reviews = [], users = [] }: ReviewsTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all'); // Bộ lọc theo rating
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    // Lọc và tìm kiếm reviews
    const filteredReviews = reviews
        .filter((review) => {
            if (filterRating === 'all') return true;
            switch (filterRating) {
                case '5':
                    return review.rating === 5;
                case '4-5':
                    return review.rating > 4 && review.rating <= 5;
                case '3-4':
                    return review.rating > 3 && review.rating <= 4;
                case '2-3':
                    return review.rating > 2 && review.rating <= 3;
                case '1-2':
                    return review.rating > 1 && review.rating <= 2;
                case '0-1':
                    return review.rating <= 1;
                default:
                    return true;
            }
        })
        .filter((review) => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            const user = getUserById(users, review.userId);
            return (
                review.name.toLowerCase().includes(searchLower) ||
                (user?.email?.toLowerCase().includes(searchLower) || false) ||
                review.review.toLowerCase().includes(searchLower)
            );
        });

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredReviews.length / rowsPerPage);
    const paginatedReviews = filteredReviews.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            {/* Thanh điều khiển: Bộ lọc, Tìm kiếm */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mb: 2,
                    gap: 2,
                }}
            >
                {/* Bộ lọc theo Rating */}
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel
                        sx={{
                            color: 'gray.500',
                            '&.Mui-focused': {
                                color: 'dark.500',
                            },
                        }}
                    >
                        Filter by Rating
                    </InputLabel>
                    <Select
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value as string)}
                        label="Filter by Rating"
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '12px 20px 8px 20px',
                                fontSize: 16,
                            },
                            '& .MuiInputBase-root': {
                                padding: '0px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray.200',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray.400',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'dark.500',
                                borderWidth: 1,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        fontSize: 16,
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="all">All Reviews</MenuItem>
                        <MenuItem value="5">5 Stars</MenuItem>
                        <MenuItem value="4-5">4 - 5 Stars</MenuItem>
                        <MenuItem value="3-4">3 - 4 Stars</MenuItem>
                        <MenuItem value="2-3">2 - 3 Stars</MenuItem>
                        <MenuItem value="1-2">1 - 2 Stars</MenuItem>
                        <MenuItem value="0-1">0 - 1 Star</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    placeholder="Search"
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

            {/* Bảng reviews */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, minWidth: '150px' }}>User</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 600, minWidth: '300px' }}>Review</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '5%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedReviews.length > 0 ? (
                            paginatedReviews.map((review, index) => {
                                const user = getUserById(users, review.userId);
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar
                                                    src={user?.avatar || ''}
                                                    alt={user?.name || 'Unknown User'}
                                                    sx={{ width: 32, height: 32 }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {user?.name || 'Unknown User'}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{review.rating}</TableCell>
                                        <TableCell>{review.review}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No reviews found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Phân trang */}
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

export default ReviewsTable;