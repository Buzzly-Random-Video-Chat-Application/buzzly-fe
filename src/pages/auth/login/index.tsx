import { Box } from '@mui/material'
import LoginCard from './components/LoginCard'
import { icons } from '../../../assets'

const Login = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', py: { xs: '50px', md: '100px' }, px: { xs: '10px', md: '100px' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '20px', md: '0' } }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, width: { xs: '100%', md: '60%' } }} component={'img'} src={icons.auth} alt={'login'} />
            <LoginCard />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: { xs: '100%', md: '60%' } }} component={'img'} src={icons.auth} alt={'login'} />
        </Box>
    )
}

export default Login