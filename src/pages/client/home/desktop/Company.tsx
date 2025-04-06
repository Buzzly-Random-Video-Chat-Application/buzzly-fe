import { Box } from '@mui/material'
import { icons } from '../../../../assets'

const Company = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', userSelect: 'none', paddingX: '10%' }}>
            <Box component={'img'} src={icons.amazon} alt={'amazon'} />
            <Box component={'img'} src={icons.dribbble} alt={'dribbble'} />
            <Box component={'img'} src={icons.hubspot} alt={'hubspot'} />
            <Box component={'img'} src={icons.notion} alt={'notion'} />
            <Box component={'img'} src={icons.netflix} alt={'netflix'} />
        </Box>
    )
}

export default Company