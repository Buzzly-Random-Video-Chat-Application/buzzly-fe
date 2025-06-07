import { FileCopyRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { toast } from 'react-hot-toast';

interface FeedbackCardProps {
    feedback: IFeedback;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            padding: '12px 24px',
            border: '1px solid #F0F1F2',
            gap: '24px',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'dark.500',
                    borderRadius: '6px',
                    padding: '4px 12px',
                }}>
                    <Typography sx={{
                        fontSize: '12px !important',
                        fontWeight: 600,
                        color: 'white.50',
                    }}>
                        {feedback.isProcessed ? 'resolved' : 'processing'}
                    </Typography>
                </Box>
            </Box>
            <Typography sx={{
                fontSize: '24px !important',
                fontWeight: 600,
                color: 'dark.500',
            }}>
                {feedback.name}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                gap: '12px',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'dark.500',
                    borderRadius: '6px',
                    padding: '4px 12px',
                }}>
                    <Typography sx={{
                        fontSize: '16px !important',
                        fontWeight: 600,
                        color: 'white.50',
                    }}>
                        email address
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Typography sx={{
                        fontSize: '18px !important',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: 'dark.200',
                    }}>
                        {feedback.email}
                    </Typography>
                    <IconButton sx={{
                        padding: '0px',
                        cursor: 'pointer',
                    }} disableTouchRipple onClick={() => {
                        navigator.clipboard.writeText(feedback.email);
                        toast.success('Email address copied to clipboard');
                    }}>
                        <FileCopyRounded fontSize="small" sx={{ color: 'dark.200' }} />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                backgroundColor: 'dark.500',
                padding: '18px',
                borderRadius: '12px',
                gap: '10px',
                minHeight: '200px',
            }}>
                <Typography sx={{
                    fontSize: '18px !important',
                    fontWeight: 600,
                    color: 'white.50',
                }}>{feedback.title}</Typography>
                <Divider sx={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'white.50',
                }} />
                <Typography sx={{
                    fontSize: '16px !important',
                    fontWeight: 400,
                    color: 'white.50',
                }}>{feedback.message}</Typography>
            </Box>
        </Box>
    )
}

export default FeedbackCard