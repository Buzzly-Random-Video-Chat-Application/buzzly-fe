import { Box, Typography } from '@mui/material';
import OurJourneyCard from './OurJourneyCard';

interface OurJourneyCardProps {
    title: string;
    description: string;
}

const OurJourneyData: OurJourneyCardProps[] = [
    { title: 'The Vision Begins', description: 'The idea for Buzzly was born with a simple goal: to create a platform that connects people worldwide in real-time.' },
    { title: 'Building the Foundation', description: 'Development started with a small but passionate team of engineers and designers. Launched the beta version, gaining our first 10,000 users within the first month.' },
    { title: 'Recognition and Growth', description: 'Buzzly won the "Best Social Connection App" award at the Global App Summit. Crossed 20 million users in 150+ countries, hosting over 50 million conversations monthly.' },
    { title: 'The Journey Continues', description: 'Rolled out Buzzly Premium, offering exclusive features like advanced filters and ad-free chatting.' },
];

const OurJourneySection = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: { xs: '30px', md: '40px' },
            }}
        >
            {OurJourneyData.map((item, index) => {
                const year = index === 0 ? 2019 : index === 1 ? 2020 : index === 2 ? 2023 : 2024;
                const isEven = index % 2 === 1;

                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: { xs: '20px', md: '100px' },
                            justifyContent: {
                                xs: 'center',
                                md: isEven ? 'flex-end' : 'flex-start',
                            },
                            alignItems: { xs: 'center', md: 'flex-start' },
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '32px', sm: '48px', md: '60px' },
                                minWidth: { xs: 'auto', md: '150px' },
                            }}
                        >
                            {year}
                        </Typography>
                        <OurJourneyCard title={item.title} description={item.description} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default OurJourneySection;