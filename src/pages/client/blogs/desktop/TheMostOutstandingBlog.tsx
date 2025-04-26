import { Box, Typography } from '@mui/material'
import BlogHorizontalCard from '../components/BlogHorizontalCard'
import { blogs } from '@constants/app'

const TheMostOutstandingBlog = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            gap: '20px',
        }}>
            <Typography variant='h3'>The most outstanding</Typography>
            <BlogHorizontalCard blog={blogs[5]} />
        </Box>
    )
}

export default TheMostOutstandingBlog