import { Box } from '@mui/material'
import Welcome from './desktop/Welcome'
import Company from './desktop/Company'
import Services from './desktop/Services'
import ExperienceCard from './desktop/ExperienceCard'
import Stories from './desktop/Stories'
import Guide from './desktop/Guide'
import Contact from './desktop/Contact'
import Reviews from './components/Reviews'
const HomeDesktop = () => {
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

export default HomeDesktop