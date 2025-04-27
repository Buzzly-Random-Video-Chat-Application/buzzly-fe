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
} from '@mui/material';
import { Search, MoreVert, Transgender, Visibility, Edit, Delete } from '@mui/icons-material';
import { IUser } from '../../../../types/user';
import CustomTableHead, { CustomTableHeadItemProps } from '@components/TableHead';
import { GroupRounded, Man2Rounded, Woman2Rounded } from '@mui/icons-material';
import { UppercaseFirstLetter } from '@utils/textUtils';
import { getUserFlag } from '@utils/index';
import ActionModal from './ActionModal';
import PopupModal from '@components/PopupModal';
import { useDeleteUserMutation } from '@apis/userApi';
import toast from 'react-hot-toast';
import { DELETE_USER_SUCCESS_MESSAGE, DELETE_USER_ERROR_MESSAGE } from '@constants/messages';

interface UsersTableProps {
    users: IUser[] | undefined;
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

const UsersTable = ({ users = [] }: UsersTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<CustomTableHeadItemProps>({
        icon: <GroupRounded />,
        title: 'All',
    });
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalAction, setModalAction] = useState<'view' | 'edit' | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteUser] = useDeleteUserMutation();

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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserId(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUserId(null);
        setModalAction(null);
    };

    const handleView = () => {
        setModalAction('view');
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setModalAction('edit');
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setOpenDeleteModal(true);
        setAnchorEl(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUserId) {
            toast.error('No user selected');
            return;
        }

        try {
            await deleteUser(selectedUserId).unwrap();
            toast.success(DELETE_USER_SUCCESS_MESSAGE);
            setOpenDeleteModal(false);
            handleMenuClose();
        } catch (error) {
            toast.error(DELETE_USER_ERROR_MESSAGE);
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false);
        handleMenuClose();
    };

    const selectedUser = users.find((user) => user.id === selectedUserId) || null;

    // Đảm bảo user có hashTags và preferredLanguage hợp lệ trước khi truyền vào ActionModal
    const normalizedSelectedUser = selectedUser
        ? {
            ...selectedUser,
            hashTags: Array.isArray(selectedUser.hashTags) ? selectedUser.hashTags : [],
            preferredLanguage: Array.isArray(selectedUser.preferredLanguage) ? selectedUser.preferredLanguage : [],
        }
        : null;

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
                                <TableRow key={user.id}>
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
                                        <IconButton
                                            aria-controls={anchorEl ? 'user-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorEl ? 'true' : undefined}
                                            onClick={(event) => handleMenuOpen(event, user.id)}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No user found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <StyledMenu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'user-menu-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleView}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">View</Typography>
                </MenuItem>
                <MenuItem onClick={handleEdit}>
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

            <ActionModal
                open={!!modalAction}
                onClose={handleMenuClose}
                action={modalAction || 'view'}
                user={normalizedSelectedUser}
            />

            <PopupModal
                open={openDeleteModal}
                onClose={handleDeleteCancel}
                stage="delete"
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
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

export default UsersTable;