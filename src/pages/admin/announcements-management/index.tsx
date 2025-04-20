import { Box } from '@mui/material'
import AdminTopBar from '../../../components/AdminTopBar'

const index = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            padding: '2rem 1rem',
        }}>
            <AdminTopBar />

            Announcements Management
        </Box>
    )
}

export default index