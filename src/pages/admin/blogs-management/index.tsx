import { Box } from "@mui/material"
import AdminTopBar from "../../../components/AdminTopBar"

const BlogsManagement = () => {
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

            Blog Management
        </Box>
    )
}

export default BlogsManagement