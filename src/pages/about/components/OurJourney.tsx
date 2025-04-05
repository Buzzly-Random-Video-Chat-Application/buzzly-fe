import { Box, Typography } from '@mui/material'
import OurJourneySection from './OurJourneySection'
import { isBrowser } from 'react-device-detect'

const OurJourney = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: { xs: '40px', md: '100px' },
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: '20px',
                textAlign: { xs: 'center', md: 'left' }
            }}>
                <Typography variant={isBrowser ? 'h3' : 'h4'} sx={{
                    backgroundColor: 'primary.500',
                    borderRadius: 2,
                    padding: 1,
                    paddingX: 2
                }}>
                    Our Journey
                </Typography>
                <Typography width={{ xs: '100%', md: '50%' }}>
                    Lorem ipsum dolor sit amet consectetur. Risus nisl scelerisque dolor ut condimentum vitae. Amet vitae adipiscing sit in.
                </Typography>
            </Box>

            <OurJourneySection />
        </Box>
    )
}

export default OurJourney
