import { IUser } from '../types/user';
import CustomDialog from './CustomDialog';
import { Box, styled, Switch, Typography } from '@mui/material';
import { ArrowForwardIosRounded } from '@mui/icons-material';

interface SettingModalProps {
    user: IUser | null;
    open: boolean;
    onClose: () => void;
}

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& .MuiSwitch-thumb': {
                backgroundColor: '#FFFFFF',
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#191A23',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const SettingModal = ({ user, open, onClose }: SettingModalProps) => {
    return (
        <CustomDialog open={open} onClose={onClose}>
            <Typography variant='h4' fontWeight={'bold'}>Settings</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
            }}>
                <Typography variant='h6' fontWeight={600}>Account & Security</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '10px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1'>Email</Typography>
                        <Typography variant='body1' color='gray.500'>{user?.email}</Typography>
                    </Box>
                    <ArrowForwardIosRounded sx={{ color: 'gray.300' }} fontSize='small' />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '20px'
                }}>
                    <Typography variant='body1'>Manage account</Typography>
                    <ArrowForwardIosRounded sx={{ color: 'gray.300' }} fontSize='small' />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
            }}>
                <Typography variant='h6' fontWeight={600}>Notification</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '20px'
                }}>
                    <Typography variant='body1'>Marketing Notification</Typography>
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
            }}>
                <Typography variant='h6' fontWeight={600}>Preferences</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '20px'
                }}>
                    <Typography variant='body1'>Hide gender from your profile</Typography>
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
            }}>
                <Typography variant='h6' fontWeight={600}>Services</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '20px'
                }}>
                    <Typography variant='body1'>Privacy Preference Center</Typography>
                    <ArrowForwardIosRounded sx={{ color: 'gray.300' }} fontSize='small' />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: 'dark.500',
                    cursor: 'pointer',
                    mt: '20px'
                }}>
                    <Typography variant='body1'>Help</Typography>
                    <ArrowForwardIosRounded sx={{ color: 'gray.300' }} fontSize='small' />
                </Box>
            </Box>
        </CustomDialog>
    )
}

export default SettingModal