import { Box, Typography } from '@mui/material'
import LiveCard from './LiveCard';


const LiveContent = ({ livestreams }: { livestreams: ILivestreamListResponse | undefined }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Typography variant="h3" mb={3}>
                Live Content
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))',
                gap: '10px',
                width: '100%',
                height: '100%',
            }}>
                {livestreams?.results.map((livestream, index) => (
                    <LiveCard key={index} livestream={livestream} />
                ))}
            </Box>
        </Box>
    )
}

export default LiveContent