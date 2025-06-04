import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@components/ui/Button';
import { ZoomOutRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '@apis/userApi';
import { Avatar } from '@mui/material';

interface LivestreamStatisticSectionProps {
    livestreams: ILivestream[];
}

const LivestreamStatisticSection = ({ livestreams }: LivestreamStatisticSectionProps) => {
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
                    Livestreams List
                </Typography>
                <Button
                    category="text"
                    size="small"
                    shape="square"
                    width="auto"
                    icon={<ZoomOutRounded />}
                    onClick={() => navigate('/livestreams-management')}
                >
                    See all
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #F0F1F2' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Host</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Livestream Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Greeting</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Announcement</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Streaming Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livestreams.length > 0 ? (
                            livestreams.slice(0, 5).map((livestream, index) => (
                                <TableRow key={livestream.id}>
                                    {/* ID */}
                                    <TableCell sx={{ width: 'fit-content' }}>{index + 1}</TableCell>
                                    {/* Host */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={users?.results.find((user) => user.id === livestream.host.userId)?.avatar || ''}
                                                alt={livestream.livestreamName}
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
                                                {users?.results.find((user) => user.id === livestream.host.userId)?.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    {/* Livestream Name */}
                                    <TableCell sx={{ width: 'fit-content' }}>{livestream.livestreamName}</TableCell>
                                    {/* Livestream Greeting */}
                                    <TableCell sx={{ width: 'fit-content' }}>{livestream.livestreamGreeting}</TableCell>
                                    {/* Livestream Announcement */}
                                    <TableCell sx={{ width: 'fit-content' }}>{livestream.livestreamAnnouncement}</TableCell>
                                    {/* Streaming Status */}
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: livestream.isLive ? '#4caf50' : '#bdbdbd',
                                                }}
                                            />
                                            <Typography variant="body2">
                                                {livestream.isLive ? 'Online' : 'Offline'}
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
                                            {new Date(livestream.createdAt).toLocaleDateString('en-US', {
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

export default LivestreamStatisticSection;