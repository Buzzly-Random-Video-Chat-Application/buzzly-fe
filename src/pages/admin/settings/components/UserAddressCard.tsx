import { Box, Typography } from '@mui/material'
import UserInfoFormItem from './UserInfoFormItem'
import Button from '@components/ui/Button'
import { Edit } from '@mui/icons-material'

const UserAddressCard = () => {
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
                    Address
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
                <UserInfoFormItem label={'Country'} value={'Viet Nam'} />
                <UserInfoFormItem label={'City'} value={'Ho Chi Minh City'} />
                <UserInfoFormItem label={'Postal Code'} value={'VNC 3004'} />
            </Box>
        </Box>
    )
}

export default UserAddressCard