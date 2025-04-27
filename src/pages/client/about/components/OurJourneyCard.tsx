import { Box, Typography } from '@mui/material'
import { icons } from '@assets/index'

interface OurJourneyCardProps {
    title: string
    description: string
}

const OurJourneyCard = ({ title, description }: OurJourneyCardProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '20px', sm: '40px' },
                width: '100%',
                maxWidth: '600px',
                bgcolor: 'dark.500',
                padding: { xs: '20px', sm: '30px' },
                borderRadius: '30px',
            }}
        >
            <Box
                component="img"
                src={icons.aboutstartlight}
                alt="about start light"
                sx={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    alignSelf: { xs: 'center', sm: 'flex-start' }
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '16px',
                    color: 'white.50',
                    textAlign: { xs: 'center', sm: 'left' }
                }}
            >
                <Typography variant="h5" sx={{ fontSize: { xs: '20px', sm: '28px' }, width: '100%', fontWeight: 700 }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: '14px', sm: '16px' }, lineHeight: 1.6 }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    )
}

export default OurJourneyCard
