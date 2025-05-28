import { Avatar, Box, Typography } from '@mui/material';
import { RemoveRedEyeRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@apis/userApi';
import { getUserFlag } from '@utils/userUtils';

const LiveCard = ({ livestream }: { livestream: ILivestream }) => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery(livestream?.host.userId);

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
            width: '100%',
            transition: 'all 0.5s',
            cursor: 'pointer',
        }} onClick={() => navigate(`/live/guest?livestreamId=${livestream.id}`)}>
            <Box component={'img'} src={user?.result.avatar} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
            <Box sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                color: 'white.50',
                bgcolor: 'black.100',
                padding: '0px 8px',
                borderRadius: '30px',
            }}>
                <RemoveRedEyeRounded sx={{ color: 'white', fontSize: '8px' }} />
                <Box sx={{ fontSize: '8px' }}>100</Box>
            </Box>
            <Box sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                display: 'flex',
                flexDirection: 'column',
                color: 'white.50',
            }}>
                <Typography sx={{ fontSize: '8px !important', fontWeight: 600 }}>Live of {user?.result.name}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    alignItems: 'center',
                }}>
                    <Avatar src={user?.result.avatar} sx={{ width: '20px', height: '20px', objectFit: 'cover' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        alignItems: 'flex-start',
                    }}>
                        <Typography sx={{ fontSize: '8px !important', fontWeight: 600 }}>{user?.result.name}</Typography>
                        <img src={getUserFlag(user?.result ?? null)} alt="country flag" style={{ width: '8px', height: '8px' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LiveCard;
