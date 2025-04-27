import React from 'react';
import CustomDialog from '@components/CustomDialog';
import { Box, Button, Typography } from '@mui/material';
import { icons } from '@assets/index';
import GenderButton from './GenderButton';

interface GenderModalProps {
    open: boolean;
    onClose: () => void;
    onGenderSelect: (selectedGender: string) => void;
    onStartVideoChat: () => void;
}

const GenderModal = ({ open, onClose, onGenderSelect, onStartVideoChat }: GenderModalProps) => {
    const [selectedGender, setSelectedGender] = React.useState('both');

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
        onGenderSelect(gender);
    };

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'flex-start',
            }}>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: '24px', md: '32px' } }}>
                    Connect to
                </Typography>
                <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    Choose your preferred gender
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '20px',
                gap: { xs: '5px', md: '10px' },
            }}>
                <GenderButton
                    label="Both"
                    icon={icons.both}
                    isSelected={selectedGender === 'both'}
                    onClick={() => handleGenderChange('both')}
                />
                <GenderButton
                    label="Male"
                    icon={icons.male}
                    isSelected={selectedGender === 'male'}
                    onClick={() => handleGenderChange('male')}
                />
                <GenderButton
                    label="Female"
                    icon={icons.female}
                    isSelected={selectedGender === 'female'}
                    onClick={() => handleGenderChange('female')}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                mt: '20px',
                flexDirection: { xs: 'column', md: 'row' },
            }}>
                <Button
                    sx={{
                        flex: 1,
                        bgcolor: 'primary.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        padding: { xs: '8px', md: '10px' },
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: { xs: '14px', md: '16px' },
                        fontWeight: 500,
                        ':hover': {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                    onClick={() => {
                        onStartVideoChat();
                        onClose();
                    }}
                >
                    Start Video Chat
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
                        bgcolor: 'white.50',
                        color: 'dark.500',
                        borderRadius: '30px',
                        border: '1px solid',
                        borderColor: 'dark.500',
                        paddingX: { xs: '15px', md: '20px' },
                        paddingY: '8px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: { xs: '14px', md: '16px' },
                        fontWeight: 500,
                        ':hover': {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                >
                    Close
                </Button>
            </Box>
        </CustomDialog>
    );
};

export default GenderModal;