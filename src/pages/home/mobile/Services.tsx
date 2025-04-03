import { Box, Typography } from '@mui/material';
import { Services as Data } from '../../../constants/app';
import ServiceCard from './ServiceCard';

const Services = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {Data.map((item, index) => (
                    <ServiceCard
                        key={index}
                        label={item.label}
                        href={item.href}
                        type={item.type}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Services;