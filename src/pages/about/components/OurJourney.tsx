import React from 'react'
import { Box, Typography } from '@mui/material'
import OurJourneySection from './OurJourneySection'

const OurJourney = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '100px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant='h3' sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Our Journey
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur. Risus nisl<br />
                    scelerisque dolor ut condimentum vitae. Amet vitae adipiscing sit in.
                </Typography>
            </Box>

            <OurJourneySection />
        </Box>
    )
}

export default OurJourney