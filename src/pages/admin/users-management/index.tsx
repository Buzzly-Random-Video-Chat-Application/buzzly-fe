import { Box } from "@mui/material"
import StatisticsCard from "./components/StatisticsCard"
import { GroupRounded, Man2Rounded, Woman2Rounded } from "@mui/icons-material"
import UsersTable from "./components/UsersTable"
import { useGetUsersQuery } from "../../../apis/userApi"

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
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
                gap: '2rem',
                width: '100%',
            }}>
                <StatisticsCard
                    color="dark"
                    icon={<GroupRounded fontSize="medium" />}
                    title="All Users"
                    count={281}
                    percentage={{
                        color: "500",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
                <StatisticsCard
                    color="primary"
                    icon={<Man2Rounded fontSize="medium" />}
                    title="Male Users"
                    count={281}
                    percentage={{
                        color: "600",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
                <StatisticsCard
                    color="red"
                    icon={<Woman2Rounded fontSize="medium" />}
                    title="Female Users"
                    count={281}
                    percentage={{
                        color: "300",
                        amount: 55,
                        label: "than lask week",
                    }}
                />
            </Box>

            <UsersTable users={user?.results} />
        </Box>
    )
}

export default UserManagement