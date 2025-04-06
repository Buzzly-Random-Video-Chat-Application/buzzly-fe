import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { ZoomOutRounded } from '@mui/icons-material';
import { IReview } from '../../../../types/review';
import Button from '../../../../components/ui/Button';
import { IUser } from '../../../../types/user';
import { getUserById } from '../../../../utils';
import DashboardSumaryReviewCard from '../../../../components/DashboardSumaryReviewCard';

interface ReviewsStatisticCardProps {
    reviews: IReview[];
    users: IUser[];
}

const ReviewsStatisticCard = ({ reviews, users }: ReviewsStatisticCardProps) => {
    return (
        <Box sx={{
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            width: '100%',
            p: 3,
            border: '1px solid #F0F1F2',
        }}>
            <Box sx={{ mb: 3, width: '50%' }}>
                <DashboardSumaryReviewCard />
            </Box>
            <Divider sx={{
                my: 2,
                opacity: 0.25,
                backgroundImage: 'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0))',
            }} />
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#191A23', fontWeight: 600, mb: 2 }}>
                    Reviews List
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
                            <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.slice(0, 5).map((review, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ width: '50px' }}>{index + 1}</TableCell>
                                <TableCell sx={{ minWidth: '200px' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        <Avatar
                                            src={getUserById(users, review.userId)?.avatar || ''}
                                            alt={getUserById(users, review.userId)?.name || 'Unknown User'}
                                            sx={{ width: 32, height: 32 }}
                                        />
                                        {getUserById(users, review.userId)?.name || 'Unknown User'}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ width: '100px' }}>{review.rating}</TableCell>
                                <TableCell sx={{ minWidth: '300px' }}>{review.review}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReviewsStatisticCard;