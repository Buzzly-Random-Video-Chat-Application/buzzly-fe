import React from 'react';
import CustomDialog from '../../../components/CustomDialog';
import { Box, Button, Typography } from '@mui/material';
import { icons } from '../../../assets';
import GenderButton from './GenderButton';

interface GenderModalProps {
    open: boolean;
    onClose: () => void;
}

const GenderModal = ({ open, onClose }: GenderModalProps) => {
    const [selectedGender, setSelectedGender] = React.useState('both');

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'flex-start',
            }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Connect to</Typography>
                <Typography variant="body1">Choose your preferred gender</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '20px',
            }}>
                <GenderButton
                    label="Both"
                    icon={icons.both}
                    isSelected={selectedGender === 'both'}
                    onClick={() => setSelectedGender('both')}
                />
                <GenderButton
                    label="Male"
                    icon={icons.male}
                    isSelected={selectedGender === 'male'}
                    onClick={() => setSelectedGender('male')}
                />
                <GenderButton
                    label="Female"
                    icon={icons.female}
                    isSelected={selectedGender === 'female'}
                    onClick={() => setSelectedGender('female')}
                />
            </Box>
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
                }}>
                    Start Video Chat
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
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
                    Close
                </Button>
            </Box>
        </CustomDialog>
    );
};

export default GenderModal;
