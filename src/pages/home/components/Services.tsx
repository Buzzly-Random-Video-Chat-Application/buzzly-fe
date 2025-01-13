import { Box, Typography } from '@mui/material';
import { ServiceData } from '../../../constants/app';
import ServiceCard from './ServiceCard';

const Services = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant='h3' sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Services
                </Typography>
                <Typography>
                    From seamless communication tools to user-friendly functionalities,<br />our services are tailored to meet your needs.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginTop: '50px' }}>
                {ServiceData.map((item, index) => (
                    <ServiceCard
                        key={index}
                        label={item.label}
                        icon={item.icon}
                        href={item.href}
                        type={item.type}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Services;
