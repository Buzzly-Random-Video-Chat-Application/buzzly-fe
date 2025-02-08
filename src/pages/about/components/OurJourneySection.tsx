import { Box, Typography } from '@mui/material'
import OurJourneyCard from './OurJourneyCard'
// import { icons } from '../../../assets'

interface OurJourneyCardProps {
    title: string
    description: string
}

const OurJourneyData: OurJourneyCardProps[] = [
    { title: 'The Vision Begins', description: 'The idea for Buzzly was born with a simple goal: to create a platform that connects people worldwide in real-time.' },
    { title: 'Building the Foundation', description: 'Development started with a small but passionate team of engineers and designers. Launched the beta version, gaining our first 10,000 users within the first month.' },
    { title: 'Recognition and Growth', description: 'Buzzly won the "Best Social Connection App" award at the Global App Summit. Crossed 20 million users in 150+ countries, hosting over 50 million conversations monthly.' },
    { title: 'The Journey Continues', description: 'Rolled out Buzzly Premium, offering exclusive features like advanced filters and ad-free chatting.' }
]

const OurJourneySection = () => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '50px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '100px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                <Typography variant='h1'>2019</Typography>
                <OurJourneyCard title={OurJourneyData[0].title} description={OurJourneyData[0].description} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '100px',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }}>
                <Typography variant='h1'>2020</Typography>
                <OurJourneyCard title={OurJourneyData[1].title} description={OurJourneyData[1].description} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '100px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                <Typography variant='h1'>2023</Typography>
                <OurJourneyCard title={OurJourneyData[2].title} description={OurJourneyData[2].description} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '100px',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }}>
                <Typography variant='h1'>2024</Typography>
                <OurJourneyCard title={OurJourneyData[3].title} description={OurJourneyData[3].description} />
            </Box>

            {/* <Box component={'img'} src={icons.illusabout} sx={{
                position: 'absolute',
                left: 1000,
                bottom: 300,
                width: '350px',
                height: '150px',
                objectFit: 'contain',
                zIndex: -1,
            }} />

            <Box component={'img'} src={icons.illusabout} sx={{
                position: 'absolute',
                left: -300,
                top: 300,
                width: '350px',
                height: '150px',
                objectFit: 'contain',
                zIndex: -1,
            }} /> */}
        </Box>
    )
}

export default OurJourneySection