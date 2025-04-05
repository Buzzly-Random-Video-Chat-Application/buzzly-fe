import { Box, Typography } from '@mui/material'
import BlogVerticalCard from '../components/BlogVerticalCard'
import { blogs } from '../../../constants/app'

const TheMostOutstandingBlog = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            gap: '10px',
        }}>
            <Typography variant='h3'>The most outstanding</Typography>
            <BlogVerticalCard blog={blogs[5]} />
        </Box>
    )
}

export default TheMostOutstandingBlog