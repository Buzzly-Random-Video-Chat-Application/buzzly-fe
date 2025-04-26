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
    Pagination,
    Typography,
    Avatar,
} from '@mui/material';
import { Search, MoreVert, ThumbUpOffAltRounded, ReportProblemRounded } from '@mui/icons-material';
import { IReview } from '@types/review';
import { IUser } from '@types/user';
import { getUser } from '@utils';
import CustomTableHead, { CustomTableHeadItemProps } from '@components/TableHead';

interface ReviewsTableProps {
    reviews: IReview[];
    users: IUser[];
}

const ReviewsTable = ({ reviews = [], users = [] }: ReviewsTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<CustomTableHeadItemProps>({
        icon: <ThumbUpOffAltRounded />,
        title: 'Reviews',
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const filterOptions: CustomTableHeadItemProps[] = [
        { icon: <ThumbUpOffAltRounded />, title: 'Reviews' },
        { icon: <ReportProblemRounded />, title: 'Reports' },
    ];

    const filteredReviews = reviews
        .filter((review) => {
            if (selectedFilter.title === 'Reviews') return true;
            if (selectedFilter.title === 'Reports') {
                return review.rating <= 2;
            }
            return true;
        })
        .filter((review) => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            const user = getUser(users, review.userId);
            return (
                review.name.toLowerCase().includes(searchLower) ||
                (user?.email?.toLowerCase().includes(searchLower) || false) ||
                review.review.toLowerCase().includes(searchLower)
            );
        });

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    gap: 2,
                }}
            >
                <CustomTableHead
                    items={filterOptions}
                    selected={selectedFilter}
                    setSelected={setSelectedFilter}
                />

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
                                const user = getUser(users, review.userId);
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