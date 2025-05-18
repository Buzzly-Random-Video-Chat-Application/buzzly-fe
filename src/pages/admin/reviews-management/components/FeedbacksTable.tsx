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
import { Search, MoreVert } from '@mui/icons-material';
import { getUserByEmail } from '@utils/userUtils';

interface FeedbacTableProps {
    feedbacks: IFeedback[] | undefined;
    users: IUser[] | undefined;
}

const FeedbacTable = ({ feedbacks = [], users = [] }: FeedbacTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const filteredFeedback = feedbacks.filter((fb) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        const user = getUserByEmail(users, fb.email);
        return (
            fb.name?.toLowerCase().includes(searchLower) ||
            fb.email?.toLowerCase().includes(searchLower) ||
            fb.title?.toLowerCase().includes(searchLower) ||
            fb.message?.toLowerCase().includes(searchLower) ||
            user?.name?.toLowerCase().includes(searchLower) ||
            false
        );
    });

    const totalPages = Math.ceil(filteredFeedback.length / rowsPerPage);
    const paginatedFeedback = filteredFeedback.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: '100%', px: { xs: 1, sm: 0 } }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mb: 2,
                    gap: 2,
                }}
            >
                <TextField
                    placeholder="Search feedback"
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
                            padding: { xs: '8px 16px 8px 4px', sm: '10px 20px 10px 8px' },
                            borderRadius: '8px',
                            fontSize: { xs: '14px', sm: '16px' },
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
                            <TableCell sx={{ fontWeight: 600, width: { xs: '15%', md: '10%' }, fontSize: { xs: '12px', sm: '14px' } }}>
                                ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    minWidth: { xs: '100px', md: '150px' },
                                    fontSize: { xs: '12px', sm: '14px' },
                                }}
                            >
                                User
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    width: { xs: '20%', md: '15%' },
                                    fontSize: { xs: '12px', sm: '14px' },
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                Title
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    minWidth: { xs: '150px', md: '300px' },
                                    fontSize: { xs: '12px', sm: '14px' },
                                }}
                            >
                                Message
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    width: { xs: '15%', md: '10%' },
                                    fontSize: { xs: '12px', sm: '14px' },
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '5%', fontSize: { xs: '12px', sm: '14px' } }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedFeedback.length > 0 ? (
                            paginatedFeedback.map((fb, index) => {
                                const user = getUserByEmail(users, fb.email);
                                return (
                                    <TableRow key={fb.id}>
                                        <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                                            {(page - 1) * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar
                                                    src={user?.avatar || ''}
                                                    alt={user?.name || 'Unknown User'}
                                                    sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: { xs: '80px', sm: '150px' },
                                                        fontSize: { xs: '12px', sm: '14px' },
                                                    }}
                                                >
                                                    {user?.name || fb.name || 'Unknown User'}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { xs: '12px', sm: '14px' },
                                                display: { xs: 'none', sm: 'table-cell' },
                                            }}
                                        >
                                            {fb.title}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    whiteSpace: 'normal',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {fb.message}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { xs: '12px', sm: '14px' },
                                                display: { xs: 'none', sm: 'table-cell' },
                                            }}
                                        >
                                            {fb.isProcessed ? 'Processed' : 'Pending'}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small">
                                                <MoreVert fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                                        No feedback found.
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
                                fontSize: { xs: '12px', sm: '14px' },
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

export default FeedbacTable;