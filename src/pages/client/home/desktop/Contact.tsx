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
                    Have a question or feedback? We're here to help!<br />Reach out to us anytime, and we'll get back to you as soon as possible.
                </Typography>
            </Box>
            <ContactCard />
        </Box>
    )
}

export default Contact