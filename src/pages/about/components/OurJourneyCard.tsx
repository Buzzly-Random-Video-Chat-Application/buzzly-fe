import { Box, Typography } from '@mui/material'
import { icons } from '../../../assets'

interface OurJourneyCardProps {
    title: string
    description: string
}

const OurJourneyCard = ({ title, description }: OurJourneyCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            width: 'fit-content',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            maxWidth: '600px',
            bgcolor: 'dark.500',
            padding: '30px',
            borderRadius: '30px',
        }}>
            <Box component={'img'} src={icons.aboutstartlight} alt='about start light' sx={{ width: '50px', height: '50px', objectFit: 'cover' }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
                color: 'light.500'
            }}>
                <Typography variant='h3'>{title}</Typography>
                <Typography variant='body1'>{description}</Typography>
            </Box>
        </Box>
    )
}

export default OurJourneyCard