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
import { Search, MoreVert, Transgender } from '@mui/icons-material';
import { IUser } from '../../../../types/user';
import CustomTableHead, { CustomTableHeadItemProps } from '../../../../components/TableHead';
import { GroupRounded, Man2Rounded, Woman2Rounded } from "@mui/icons-material";
import { UppercaseFirstLetter } from '../../../../utils';
import { getUserFlag } from '../../../../utils';

interface UsersTableProps {
    users: IUser[];
}

const UsersTable = ({ users = [] }: UsersTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<CustomTableHeadItemProps>({
        icon: <GroupRounded />,
        title: 'All',
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const filterOptions: CustomTableHeadItemProps[] = [
        { icon: <GroupRounded />, title: 'All' },
        { icon: <Man2Rounded />, title: 'Male' },
        { icon: <Woman2Rounded />, title: 'Female' },
        { icon: <Transgender />, title: 'Other' },
    ];

    const filteredUsers = users
        .filter((user) => {
            if (selectedFilter.title === 'All') return true;
            return user.gender.toLowerCase() === selectedFilter.title.toLowerCase();
        })
        .filter((user) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower)
            );
        });

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                gap: 2,
            }}>
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
                            <TableCell sx={{ fontWeight: 600, minWidth: '150px' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, minWidth: '200px' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>Nationality</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '10%' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '5%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={user.avatar || ''}
                                                alt={user.name}
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
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{UppercaseFirstLetter(user.gender)}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img src={getUserFlag(user)} /> {user.nationality}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{UppercaseFirstLetter(user.role)}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: user.isOnline ? '#4caf50' : '#bdbdbd',
                                                }}
                                            />
                                            <Typography variant="body2">
                                                {user.isOnline ? 'Online' : 'Offline'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No users found.
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

export default UsersTable;