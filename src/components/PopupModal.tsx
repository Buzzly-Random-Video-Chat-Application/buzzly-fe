import CustomDialog from './CustomDialog'
import { Box, Typography } from '@mui/material';
import { stage } from '../constants/modal';
import { ReportGmailerrorredRounded, CheckCircleOutlineRounded, DeleteOutlineRounded, LockOpenRounded } from '@mui/icons-material';
import Button from './ui/Button';

interface PopupModalProps {
    open: boolean;
    onClose: () => void;
    stage: typeof stage[number];
    title: string;
    message: string;
    onConfirm: () => void;
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PopupModal = ({ open, onClose, stage, title, message, onConfirm, width }: PopupModalProps) => {
    return (
        <CustomDialog open={open} onClose={onClose} maxWidth={width || 'xs'}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: '20px',
            }}>
                <Box sx={{
                    flexShrink: 0,
                    bgcolor: stage === 'warning' ? 'yellow.50' : (stage === 'success' || stage === 'permission') ? 'primary.100' : 'red.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    height: '80px',
                    width: '80px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        height: '60px',
                        width: '60px',
                        bgcolor: stage === 'warning' ? 'yellow.100' : (stage === 'success' || stage === 'permission') ? 'primary.300' : 'red.100',
                    }}>
                        {stage === 'warning' && <ReportGmailerrorredRounded sx={{ color: 'yellow.500', fontSize: '50px' }} />}
                        {stage === 'success' && <CheckCircleOutlineRounded sx={{ color: 'primary.600', fontSize: '50px' }} />}
                        {stage === 'delete' && <DeleteOutlineRounded sx={{ color: 'red.500', fontSize: '40px' }} />}
                        {stage === 'permission' && <LockOpenRounded sx={{ color: 'primary.600', fontSize: '30px' }} />}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '20px',
                gap: '10px',
            }}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="body1">{message}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: '10px', md: '20px' },
                mt: { xs: '20px', md: '40px' },
                flexDirection: { xs: 'column', md: 'row' },
            }}>
                <Button
                    category='primary'
                    size='small'
                    shape='pill'
                    width='100%'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    category='default'
                    size='small'
                    shape='pill'
                    width='100%'
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </Box>
        </CustomDialog>
    )
}

export default PopupModal