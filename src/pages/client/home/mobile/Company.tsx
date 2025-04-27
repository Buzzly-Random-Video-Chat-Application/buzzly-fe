import { Box } from '@mui/material';
import { icons } from '@assets/index';

const Company = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '15px'
            }}>
                <Box component={'img'} src={icons.amazon} alt={'amazon'} sx={{ width: '60px' }} />
                <Box component={'img'} src={icons.dribbble} alt={'dribbble'} sx={{ width: '60px' }} />
                <Box component={'img'} src={icons.hubspot} alt={'hubspot'} sx={{ width: '60px' }} />
                <Box component={'img'} src={icons.notion} alt={'notion'} sx={{ width: '60px' }} />
                <Box component={'img'} src={icons.netflix} alt={'netflix'} sx={{ width: '60px' }} />
            </Box>
        </Box>
    );
};

export default Company;