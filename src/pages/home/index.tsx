import { Box } from '@mui/material'
import Welcome from './components/Welcome'
import Company from './components/Company'
import Services from './components/Services'
import ExperienceCard from './components/ExperienceCard'
import Stories from './components/Stories'
import Guide from './components/Guide'
import Contact from './components/Contact'
import Reviews from './components/Reviews'

const Home = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginX: '100px', marginY: '50px', gap: '100px' }}>
            <Welcome />
            <Company />
            <Services />
            <ExperienceCard />
            <Stories />
            <Guide />
            <Reviews />
            <Contact />
        </Box>
    )
}

export default Home