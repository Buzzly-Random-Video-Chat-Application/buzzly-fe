import { Box, Typography } from '@mui/material'
import { flags, images } from '@assets'
import LiveCard from './LiveCard';


const Trending = () => {
    const liveCards = [
        { viewers: 120, username: 'Alice', country: flags.us, image: images.live1 },
        { viewers: 95, username: 'Bob', country: flags.uk, image: images.live2 },
        { viewers: 210, username: 'Charlie', country: flags.jp, image: images.live3 },
        { viewers: 78, username: 'Diana', country: flags.jp, image: images.live4 },
        { viewers: 150, username: 'Eve', country: flags.de, image: images.live5 },
    ];
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Typography variant="h3" mb={3}>
                Trending
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, minmax(100px, 1fr))', sm: 'repeat(3, minmax(100px, 1fr))' },
                gridTemplateRows: { xs: 'repeat(2, minmax(300px, 1fr))', sm: 'repeat(3, minmax(300px, 1fr))' },
                gap: '10px',
                width: '100%',
                height: '100%',
            }}>
                {liveCards.map((liveCard, index) => (
                    <LiveCard key={index} {...liveCard} />
                ))}
            </Box>
        </Box>
    )
}

export default Trending