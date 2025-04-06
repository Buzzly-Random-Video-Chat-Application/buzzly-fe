import { RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface RadioButtonProps {
    name: string;
    isSelected: boolean;
    onClick: () => void;
}

const RadioButton = ({ name, isSelected, onClick }: RadioButtonProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                marginY: '10px',
                cursor: 'pointer',
                userSelect: 'none',
            }}
            onClick={onClick}
        >
            {isSelected ? (
                <RadioButtonCheckedOutlined sx={{ color: 'primary.600', fontSize: { xs: 20, md: 24 } }} />
            ) : (
                <RadioButtonUncheckedOutlined sx={{ color: 'dark.500', fontSize: { xs: 20, md: 24 } }} />
            )}
            <Typography sx={{
                fontWeight: 400,
                fontSize: { xs: '14px', md: '18px' }
            }}>{name}</Typography>
        </Box>
    );
};

export default RadioButton;