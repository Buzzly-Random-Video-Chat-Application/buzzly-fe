import { TableRow, TableHead, TableCell, TableSortLabel, Box } from '@mui/material';

export interface CustomTableHeadItemProps {
    icon: React.ReactNode;
    title: string;
}

interface CustomTableHeadProps {
    items: CustomTableHeadItemProps[];
    selected: CustomTableHeadItemProps;
    setSelected: (item: CustomTableHeadItemProps) => void;
}

const CustomTableHead = ({ items, selected, setSelected }: CustomTableHeadProps) => {
    return (
        <TableHead>
            <TableRow sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 1 }}>
                {items.map((item, index) => (
                    <TableCell
                        key={index}
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: selected.title === item.title ? 'primary.main' : 'text.secondary',
                            bgcolor: selected.title === item.title ? 'primary.light' : 'transparent',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #F0F1F2',
                            borderRadius: '8px',
                            padding: '8px 16px',
                        }}
                    >
                        <TableSortLabel
                            active={selected.title === item.title}
                            direction={selected.title === item.title ? 'asc' : 'desc'}
                            onClick={() => setSelected(item)}
                            sx={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'dark.500',
                                mr: 2,
                            }}>
                                {item.icon}
                            </Box>
                            {item.title}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CustomTableHead;