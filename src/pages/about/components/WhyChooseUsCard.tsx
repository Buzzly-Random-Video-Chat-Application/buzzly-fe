import { Box, Typography } from '@mui/material'
import { icons } from '../../../assets'

interface WhyChooseUsCardProps {
    index: number
    title: string
    description: string
}

const WhyChooseUsCard = ({ index, title, description }: WhyChooseUsCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '30px 50px',
            gap: '50px',
            borderRadius: '45px',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '4px 4px 0px 0px #191A23',
            height: '200px',
            width: '100%',
            alignItems: 'center',
        }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component={'img'} src={icons.aboutstartdark} alt={title} sx={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                <Typography sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '40px !important',
                    color: 'primary.500',
                    fontWeight: 700,
                }}>{index}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'flex-start',
            }}>
                <Typography variant='h3' fontWeight={700}>{title}</Typography>
                <Typography variant='body1'>{description}</Typography>
            </Box>
        </Box>
    )
}

export default WhyChooseUsCard