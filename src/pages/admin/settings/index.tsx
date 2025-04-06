import { Box } from "@mui/material"
import UserHeaderCard from "./components/UserHeaderCard"
import UserInfoCard from "./components/UserInfoCard"
import UserAddressCard from "./components/UserAddressCard"

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
            <UserHeaderCard />
            <UserInfoCard />
            <UserAddressCard />
        </Box>
    )
}

export default Settings