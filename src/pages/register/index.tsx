import { Box } from '@mui/material'
import RegisterCard from './components/RegisterCard'
import { icons } from '../../assets'
const Register = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '50px' }}>
            <RegisterCard />
            <img src={icons.auth} style={{ width: '50%', height: '50%' }} />
        </Box>
    )
}

export default Register