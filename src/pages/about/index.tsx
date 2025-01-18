import { Box } from '@mui/material'
import React from 'react'
import AboutCardHeader from './components/AboutCardHeader'
import AboutUsCard from './components/AboutUsCard'
import JoinNow from './components/JoinNow'
import OurJourney from './components/OurJourney'
import WhyChooseUs from './components/WhyChooseUs'

const About = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '100px',
            gap: '100px',
        }}>
            <AboutCardHeader />
            <AboutUsCard />
            <WhyChooseUs />
            <OurJourney />
            <JoinNow />
        </Box>
    )
}

export default About