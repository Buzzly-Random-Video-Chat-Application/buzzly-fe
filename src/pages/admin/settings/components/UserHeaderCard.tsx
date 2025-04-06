import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { useAppSelector } from '../../../../stores/store'
import { Edit } from '@mui/icons-material'

const UserHeaderCard = () => {
    const { user } = useAppSelector((state) => state.user)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: '20px 50px',
            gap: '40px',
            bgcolor: 'dark.500',
            borderRadius: '20px',
            textAlign: 'center',
        }}>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
            }}>
                <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
                <IconButton sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.500',
                    '&:hover': {
                        bgcolor: 'white.50',
                    }
                }}>
                    <Edit sx={{
                        color: 'dark.500',
                        fontSize: 12,
                    }} />
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                color: 'white.50',
            }}>
                <Typography sx={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'primary.500',
                }}>
                    {user?.name}
                </Typography>
                <Typography sx={{
                    fontSize: 24,
                    fontWeight: 400,
                }}>
                    Admin
                </Typography>
                <Typography sx={{
                    fontSize: 24,
                    fontWeight: 400,
                }}>
                    Dong Hoa, Di An, Binh Duong, Vietnam
                </Typography>
            </Box>
        </Box>
    )
}

export default UserHeaderCard