import React from 'react'
import CustomDialog from './CustomDialog'
import { Box, Typography, Button } from '@mui/material';
import { stage } from '../constants/modal';
import { ReportGmailerrorredRounded, CheckCircleOutlineRounded, DeleteOutlineRounded, LockOpenRounded } from '@mui/icons-material';

interface PopupModalProps {
    open: boolean;
    onClose: () => void;
    stage: typeof stage[number];
    title: string;
    message: string;
    onConfirm: () => void;
}

const PopupModal = ({ open, onClose, stage, title, message, onConfirm }: PopupModalProps) => {
    return (
        <CustomDialog open={open} onClose={onClose}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
                gap: '20px',
            }}>
                <Box sx={{
                    flexShrink: 0,
                    bgcolor: stage === 'warning' ? 'yellow.50' : stage === 'success' || 'permission' ? 'primary.100' : 'red.50',
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
                        bgcolor: stage === 'warning' ? 'yellow.100' : stage === 'success' || 'permission' ? 'primary.300' : 'red.100',
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
                textAlign: 'left',
                marginTop: '20px',
            }}>
                <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 1 }}>{title}</Typography>
                <Typography variant="body1">{message}</Typography>
            </Box>

            {/* BUTTONS */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                mt: '40px',
            }}>
                <Button sx={{
                    flex: 1,
                    bgcolor: 'primary.500',
                    color: 'dark.500',
                    borderRadius: '30px',
                    padding: '10px',
                    boxShadow: '3px 3px 0px 0px #191A23',
                    transition: 'all 0.3s',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    ":hover": {
                        boxShadow: '5px 5px 0px 0px #191A23',
                        transform: 'translateY(-5px)',
                    },
                }} onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    sx={{
                        flex: 1,
                        bgcolor: 'light.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        border: '1px solid',
                        borderColor: 'dark.500',
                        paddingX: '20px',
                        paddingY: '10px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        ":hover": {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </CustomDialog>
    )
}

export default PopupModal