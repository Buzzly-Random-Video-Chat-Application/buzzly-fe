import { Box } from '@mui/material';
import Welcome from './mobile/Welcome';
import Company from './mobile/Company';
import Services from './mobile/Services';
import ExperienceCard from './mobile/ExperienceCard';
import Stories from './mobile/Stories';
import Guide from './mobile/Guide';
import Contact from './mobile/Contact';
import Reviews from './mobile/Reviews';

const HomeMobile = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginX: '20px',
            marginY: '30px',
            gap: '40px'
        }}>
            <Welcome />
            <Company />
            <Services />
            <ExperienceCard />
            <Stories />
            <Guide />
            <Reviews />
            <Contact />
        </Box>
    );
};

export default HomeMobile;