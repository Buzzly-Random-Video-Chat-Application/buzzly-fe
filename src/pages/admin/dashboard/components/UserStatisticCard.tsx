import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IUser } from '../../../../types/user';
import Button from '../../../../components/ui/Button';
import { ZoomOutRounded } from '@mui/icons-material';
import { getUserFlag } from '../../../../utils';

interface UserStatisticCardProps {
    users: IUser[];
}

const UserStatisticCard = ({ users }: UserStatisticCardProps) => {
    return (
        <Box sx={{
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            width: '100%',
            p: 3,
            border: '1px solid #F0F1F2',
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
                            <TableCell sx={{ fontWeight: 600 }}>Show Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(0, 5).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <img src={getUserFlag(user)} /> {user.nationality}
                                </TableCell>
                                <TableCell>{user.isShowReview ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserStatisticCard;