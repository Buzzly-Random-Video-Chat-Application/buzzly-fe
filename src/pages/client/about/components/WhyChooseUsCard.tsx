import { Box, Typography } from '@mui/material'
import { icons } from '@assets'

interface WhyChooseUsCardProps {
    index: number
    title: string
    description: string
}

const WhyChooseUsCard = ({ index, title, description }: WhyChooseUsCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: '20px', sm: '30px 40px', md: '30px 50px' },
            gap: { xs: '20px', sm: '30px', md: '50px' },
            borderRadius: '45px',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '4px 4px 0px 0px #191A23',
            height: { xs: 'auto', md: '200px' },
            width: '100%',
            alignItems: 'center',
            textAlign: { xs: 'center', md: 'left' },
        }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component={'img'} src={icons.aboutstartdark} alt={title} sx={{
                    width: { xs: '80px', sm: '90px', md: '100px' },
                    height: { xs: '80px', sm: '90px', md: '100px' },
                    objectFit: 'contain'
                }} />
                <Typography sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: { xs: '30px', sm: '35px', md: '40px' },
                    color: 'primary.500',
                    fontWeight: 700,
                }}>
                    {index}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: { xs: 'center', md: 'flex-start' },
            }}>
                <Typography variant='h4' fontWeight={700} sx={{ fontSize: { xs: '18px', sm: '22px', md: '24px' } }}>
                    {title}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    )
}

export default WhyChooseUsCard
