import { Box, Typography } from '@mui/material'
import ContactCard from './ContactCard'

const Contact = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant="h3" sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Contact Us
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur.<br />Ultricies eu arcu
                </Typography>
            </Box>
            <ContactCard />
        </Box>
    )
}

export default Contact