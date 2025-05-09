import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IUser } from '../../../../types/user';
import Button from '@components/ui/Button';
import { ZoomOutRounded } from '@mui/icons-material';
import { getUserFlag } from '@utils/userUtils';
import { UppercaseFirstLetter } from '@utils/textUtils';
import { useNavigate } from 'react-router-dom';

interface UserStatisticSectionProps {
    users: IUser[];
}

const UserStatisticSection = ({ users }: UserStatisticSectionProps) => {
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
                    Users List
                </Typography>
                <Button
                    category="text"
                    size="small"
                    shape="square"
                    width="auto"
                    icon={<ZoomOutRounded />}
                    onClick={() => navigate('/users-management')}
                >
                    See all
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #F0F1F2' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Nationality</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.slice(0, 5).map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{UppercaseFirstLetter(user.role)}</TableCell>
                                    <TableCell>{UppercaseFirstLetter(user.gender)}</TableCell>
                                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <img src={getUserFlag(user)} style={{ width: '20px', height: '13px' }} /> {user.nationality}
                                    </TableCell>
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
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No user found.
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

export default UserStatisticSection;