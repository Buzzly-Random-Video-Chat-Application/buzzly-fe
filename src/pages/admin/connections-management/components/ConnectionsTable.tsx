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
import { Search, MoreVert, Visibility, Edit, Delete } from '@mui/icons-material';
import CustomTableHead, { CustomTableHeadItemProps } from '@components/TableHead';
import { ConnectWithoutContactRounded, DuoRounded } from '@mui/icons-material'
import PopupModal from '@components/PopupModal';
import { useGetUsersQuery } from '@apis/userApi';
import toast from 'react-hot-toast';
import { DELETE_USER_SUCCESS_MESSAGE, DELETE_USER_ERROR_MESSAGE } from '@constants/messages';
import { useDeleteConnectionMutation } from '@apis/connectionApi';

interface ConnectionsTableProps {
    connections: IConnection[] | undefined;
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

const ConnectionsTable = ({ connections = [] }: ConnectionsTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filterOptions: CustomTableHeadItemProps[] = [
        { icon: <ConnectWithoutContactRounded />, title: 'All Connections' },
        { icon: <DuoRounded />, title: 'Current Connections' },
    ];
    const [selectedFilter, setSelectedFilter] = useState<CustomTableHeadItemProps>(filterOptions[0]);
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteConnection] = useDeleteConnectionMutation();

    const { data: users } = useGetUsersQuery({
        page: 1,
        limit: 1000,
    });

    const rowsPerPage = 10;

    const filteredConnections = connections
        .filter((connection) => {
            if (selectedFilter.title === 'All Connections') return true;
            return connection.isLive !== (selectedFilter.title.toLowerCase() === 'Current Connections');
        })
        .filter((connection) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                connection.roomId.toLowerCase().includes(searchLower) ||
                connection.p1UserId.toLowerCase().includes(searchLower) ||
                connection.p2UserId.toLowerCase().includes(searchLower) ||
                connection.isLive.toString().includes(searchLower) ||
                connection.createdAt.toString().includes(searchLower)
            );
        });

    const totalPages = Math.ceil(filteredConnections.length / rowsPerPage);
    const paginatedConnections = filteredConnections.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRoomId(null);
    };

    const handleDelete = () => {
        setOpenDeleteModal(true);
        setAnchorEl(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedRoomId) {
            toast.error('No connection selected');
            return;
        }

        try {
            await deleteConnection(selectedRoomId).unwrap();
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
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>User 1</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>User 2</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedConnections.length > 0 ? (
                            paginatedConnections.map((connection, index) => (
                                <TableRow key={connection.roomId}>
                                    {/* ID */}
                                    <TableCell sx={{ width: 'fit-content' }}>{index + 1}</TableCell>
                                    {/* User 1 */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={users?.results.find((user) => user.id === connection.p1UserId)?.avatar || ''}
                                                alt={connection.p1UserId}
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
                                                {users?.results.find((user) => user.id === connection.p2UserId)?.name || 'Anonymous'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    {/* User 2 */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={users?.results.find((user) => user.id === connection.p2UserId)?.avatar || ''}
                                                alt={connection.p2UserId}
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
                                                {users?.results.find((user) => user.id === connection.p2UserId)?.name || 'Anonymous'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    {/* Status */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: connection.isLive ? '#4caf50' : '#bdbdbd',
                                                }}
                                            />
                                            <Typography variant="body2">
                                                {connection.isLive ? 'Online' : 'Offline'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    {/* Created At */}
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
                                            {new Date(connection.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </TableCell>
                                    {/* Actions */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <IconButton
                                            aria-controls={anchorEl ? 'user-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorEl ? 'true' : undefined}
                                            onClick={() => { }}
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
                                        No livestream found.
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
                <MenuItem onClick={() => { }}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">View</Typography>
                </MenuItem>
                <MenuItem onClick={() => { }}>
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
                title="Delete Livestream"
                message="Are you sure you want to delete this livestream? This action cannot be undone."
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

export default ConnectionsTable;