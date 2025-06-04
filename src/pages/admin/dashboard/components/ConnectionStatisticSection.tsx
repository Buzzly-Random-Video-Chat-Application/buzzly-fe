import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@components/ui/Button';
import { ZoomOutRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '@apis/userApi';
import { Avatar } from '@mui/material';

interface ConnectionStatisticSectionProps {
    connections: IConnection[];
}

const ConnectionStatisticSection = ({ connections }: ConnectionStatisticSectionProps) => {
    const navigate = useNavigate();
    const { data: users } = useGetUsersQuery({
        page: 1,
        limit: 1000,
    });
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
                    Connections List
                </Typography>
                <Button
                    category="text"
                    size="small"
                    shape="square"
                    width="auto"
                    icon={<ZoomOutRounded />}
                    onClick={() => navigate('/connections-management')}
                >
                    See all
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #F0F1F2' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>User 1</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>User 2</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connections.length > 0 ? (
                            connections.slice(0, 5).map((connection, index) => (
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
        </Box>
    );
};

export default ConnectionStatisticSection;