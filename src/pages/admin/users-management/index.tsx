import { Box } from "@mui/material"
import UsersTable from "./components/UsersTable"
import StatisticSection from "./components/StatisticSection"
import { useGetUsersQuery } from "../../../apis/userApi"
import AdminTopBar from '../../../components/AdminTopBar'

const UserManagement = () => {
    const { data: user } = useGetUsersQuery({})
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
            <StatisticSection />
            <UsersTable users={user?.results} />
        </Box>
    )
}

export default UserManagement