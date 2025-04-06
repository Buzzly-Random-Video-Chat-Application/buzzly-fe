import { Box, Typography, IconButton } from '@mui/material';
import { ArrowOutwardRounded } from '@mui/icons-material';

interface ServiceCardProps {
    label: string;
    href: string;
    type: number;
}

const ServiceCard = ({ label, href, type }: ServiceCardProps) => {
    const styles: Record<number, { backgroundColor: string; iconButtonBg: string; iconButtonColor: string }> = {
        1: { backgroundColor: 'white.50', iconButtonBg: 'dark.500', iconButtonColor: 'primary.500' },
        2: { backgroundColor: 'primary.500', iconButtonBg: 'dark.500', iconButtonColor: 'primary.500' },
        3: { backgroundColor: 'dark.500', iconButtonBg: 'white.50', iconButtonColor: 'dark.500' },
    };

    const { backgroundColor, iconButtonBg, iconButtonColor } = styles[type];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor,
            borderRadius: '25px',
            border: '1px solid #191A23',
            padding: '20px',
            boxShadow: '0px 3px 0px 0px #191A23'
        }}>
            <Typography variant='h6' color={iconButtonBg}>{label}</Typography>
            <IconButton
                sx={{ backgroundColor: iconButtonBg, color: iconButtonColor }}
                onClick={() => window.open(href, '_blank')}
            >
                <ArrowOutwardRounded />
            </IconButton>
        </Box>
    );
};

export default ServiceCard;