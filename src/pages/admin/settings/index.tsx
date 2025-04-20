import { Box } from "@mui/material"
import UserHeaderCard from "./components/UserHeaderCard"
import UserInfoCard from "./components/UserInfoCard"
import UserAddressCard from "./components/UserAddressCard"
import AdminTopBar from '../../../components/AdminTopBar'

const Settings = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            padding: '2rem 1rem',
        }}>
            <AdminTopBar />
            <UserHeaderCard />
            <UserInfoCard />
            <UserAddressCard />
        </Box>
    )
}

export default Settings