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
                gap: '20px',
                marginY: '10px',
                cursor: 'pointer',
                userSelect: 'none',
            }}
            onClick={onClick}
        >
            {isSelected ? (
                <RadioButtonCheckedOutlined sx={{ color: 'primary.600', fontSize: '24px' }} />
            ) : (
                <RadioButtonUncheckedOutlined sx={{ color: 'dark.500', fontSize: '24px' }} />
            )}
            <Typography variant="body1">{name}</Typography>
        </Box>
    );
};

export default RadioButton;