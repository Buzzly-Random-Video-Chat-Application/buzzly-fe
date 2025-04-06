import { ArrowOutwardRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface ServiceCardProps {
    label: string;
    icon: string;
    href: string;
    type: number;
}

const ServiceCard = ({ label, icon, href, type }: ServiceCardProps) => {
    const styles: { [key: number]: { backgroundColor: string; iconButtonBg: string; iconButtonColor: string } } = {
        1: { backgroundColor: 'white.50', iconButtonBg: 'dark.500', iconButtonColor: 'primary.500' },
        2: { backgroundColor: 'primary.500', iconButtonBg: 'dark.500', iconButtonColor: 'primary.500' },
        3: { backgroundColor: 'dark.500', iconButtonBg: 'white.50', iconButtonColor: 'dark.500' },
    };

    const { backgroundColor, iconButtonBg, iconButtonColor } = styles[type];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none',
                backgroundColor,
                borderRadius: '45px',
                boxShadow: '0px 5px 0px 0px #191A23',
                border: '1px solid #191A23',
                paddingX: '50px',
                paddingY: '30px',
                transition: 'all 0.3s',
                ":hover": {
                    boxShadow: '0px 10px 0px 0px #191A23',
                    transform: 'translateY(-5px)',
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', height: '100%', justifyContent: 'space-between' }}>
                <Typography variant='h3' color={iconButtonBg}>{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <IconButton
                        sx={{
                            backgroundColor: iconButtonBg,
                            color: iconButtonColor,
                            transition: 'all 0.3s',
                            ":hover": {
                                backgroundColor: iconButtonBg,
                                color: iconButtonColor,
                                rotate: '45deg',
                            }
                        }}
                        onClick={() => window.open(href, '_blank')}
                    >
                        <ArrowOutwardRounded />
                    </IconButton>
                    <Typography sx={{ fontSize: 20, fontWeight: 400 }} color={iconButtonBg}>Learn More</Typography>
                </Box>
            </Box>
            <Box component={'img'} src={icon} alt={label} />
        </Box>
    );
};

export default ServiceCard;
