import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface GenderButtonProps {
    label: string;
    icon: string;
    isSelected: boolean;
    onClick: () => void;
}

const GenderButton = ({ label, icon, isSelected, onClick }: GenderButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disableTouchRipple
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingY: '20px',
                paddingX: '15px',
                gap: '15px',
                borderRadius: '10px',
                backgroundColor: isSelected ? 'primary.200' : 'light.500',
                color: 'dark.500',
                border: '3px solid',
                borderColor: isSelected ? 'primary.500' : 'light.500',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                ":hover": {
                    backgroundColor: isSelected ? 'primary.200' : 'primary.100',
                    borderColor: isSelected ? 'primary.500' : 'primary.100',
                },
            }}
        >
            <Box component="img" src={icon} alt={label} sx={{ width: 80, height: 80 }} />
            <Typography>{label}</Typography>
        </Button>
    );
};

export default GenderButton;
