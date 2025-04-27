import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CustomTableHeadItemProps {
    icon: React.ReactNode;
    title: string;
}

interface CustomTableHeadProps {
    items: CustomTableHeadItemProps[];
    selected: CustomTableHeadItemProps;
    setSelected: (item: CustomTableHeadItemProps) => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid #F0F1F2',
    borderRadius: '8px',
    padding: '8px 16px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    '& .MuiButton-startIcon': {
        marginRight: theme.spacing(2),
    },
}));

const CustomTableHead = ({ items, selected, setSelected }: CustomTableHeadProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            {items.map((item, index) => (
                <StyledButton
                    key={index}
                    sx={{
                        color: 'dark.500',
                        bgcolor: selected.title === item.title ? 'primary.light' : 'transparent',
                    }}
                    onClick={() => setSelected(item)}
                    startIcon={
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'dark.500',
                        }}>
                            {item.icon}
                        </Box>
                    }
                    disableTouchRipple
                >
                    {item.title}
                </StyledButton>
            ))}
        </Box>
    );
};

export default CustomTableHead;