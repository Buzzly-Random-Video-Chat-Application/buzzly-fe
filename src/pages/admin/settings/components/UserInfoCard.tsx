import { Box, Typography } from '@mui/material'
import UserInfoFormItem from './UserInfoFormItem'
import Button from '@components/ui/Button'
import { Edit } from '@mui/icons-material'

const UserInfoCard = () => {
    return (
        <Box sx={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            padding: '20px 50px',
            borderRadius: '20px',
            border: '1px solid #F0F1F2',
            mt: 2,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Typography sx={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'dark.500',
                }}>
                    Personal Information
                </Typography>
                <Button
                    width='auto'
                    icon={<Edit />}
                    category='primary'
                    size='small'
                    shape='square'
                >
                    Edit
                </Button>
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                width: '100%',
            }}>
                <Box gridColumn='span 1'>
                    <UserInfoFormItem label={'Username'} value={'Nguyen Quoc Thang'} />
                </Box>
                <Box gridColumn='span 2'>
                    <UserInfoFormItem label={'Email Address'} value={'nguyenqthangwork@gmail.com'} />
                </Box>

            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                width: '100%',
            }}>
                <UserInfoFormItem label={'Date of Birth'} value={'13-03-2004'} />
                <UserInfoFormItem label={'Phone Number'} value={'+84 346 129 897'} />
                <UserInfoFormItem label={'User Role'} value={'Admin'} />
            </Box>
        </Box>
    )
}

export default UserInfoCard