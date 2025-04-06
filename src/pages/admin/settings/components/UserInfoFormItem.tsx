import { Box, Typography } from '@mui/material'

interface UserInfoFormItemProps {
    label: string
    value: string
}

const UserInfoFormItem = ({ label, value }: UserInfoFormItemProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '20px 0',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: 18,
                fontWeight: 400,
                color: 'gray.400',
            }}>
                {label}
            </Typography>
            <Typography sx={{
                fontSize: 24,
                fontWeight: 500,
                color: 'dark.500',
                marginTop: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid',
                borderColor: 'gray.100',
                width: '100%',
            }}>
                {value}
            </Typography>
        </Box>
    )
}

export default UserInfoFormItem