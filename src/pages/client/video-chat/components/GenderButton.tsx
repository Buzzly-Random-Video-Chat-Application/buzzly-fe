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
                paddingY: { xs: '10px', md: '20px' },
                paddingX: '15px',
                gap: '10px',
                borderRadius: '10px',
                backgroundColor: isSelected ? 'primary.200' : 'white.50',
                color: 'dark.500',
                border: '3px solid',
                borderColor: isSelected ? 'primary.500' : 'white.50',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                ':hover': {
                    backgroundColor: isSelected ? 'primary.200' : 'primary.100',
                    borderColor: isSelected ? 'primary.500' : 'primary.100',
                },
                minWidth: { xs: '80px', md: '100px' },
            }}
        >
            <Box component="img" src={icon} alt={label} sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 } }} />
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{label}</Typography>
        </Button>
    );
};

export default GenderButton;