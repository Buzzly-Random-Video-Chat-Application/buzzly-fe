import React from 'react'
import { Box, Typography } from '@mui/material'
import WhyChooseUsCard from './WhyChooseUsCard'

interface WhyChooseUsCardProps {
    index: number
    title: string
    description: string
}

const WhyChooseUseData: WhyChooseUsCardProps[] = [
    { index: 1, title: 'Instant Connections', description: 'Meet new people in just one click, with advanced matching algorithms that ensure a smooth experience.' },
    { index: 2, title: 'Global Community', description: 'Chat with users from over 150 countries and discover diverse cultures, perspectives, and stories.' },
    { index: 3, title: 'Smart Filters', description: 'Personalize your experience with filters based on interests, language, or region.' },
    { index: 4, title: 'Safe Environment', description: 'Your safety is our top priority. Enjoy features like report, block, and AI moderation to ensure respectful interactions.' },
    { index: 5, title: 'Fun Features', description: 'Express yourself with virtual gifts, live reactions, and other interactive tools during chats.' },
]

const WhyChooseUs = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '100px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', userSelect: 'none' }}>
                <Typography variant='h3' sx={{ backgroundColor: 'primary.500', borderRadius: 2, padding: 1, paddingX: 2 }}>
                    Why Choose Us?
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur. Risus nisl<br />
                    scelerisque dolor ut condimentum vitae. Amet vitae adipiscing sit in.
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '30px',
            }}>
                {WhyChooseUseData.map((data) => (
                    <WhyChooseUsCard key={data.index} index={data.index} title={data.title} description={data.description} />
                ))}
            </Box>
        </Box>
    )
}

export default WhyChooseUs