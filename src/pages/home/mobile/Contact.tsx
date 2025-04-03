import { Box, Typography } from '@mui/material';
import ContactCard from './ContactCard';

const Contact = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px'
        }}>
            <Typography variant='h4' textAlign="center">
                Contact Us
            </Typography>
            <ContactCard />
        </Box>
    );
};

export default Contact;