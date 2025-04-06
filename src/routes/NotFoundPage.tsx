import { Box, Typography } from "@mui/material"
import Button from "../components/ui/Button"
import { icons } from "../assets"
import { isBrowser } from "react-device-detect"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <Box sx={{
            backgroundImage: `url(${icons.notfoundbg})`,
            backgroundSize: 'auto',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
        }}>
            <Typography sx={{
                fontSize: { xs: '40px', sm: '100px' },
                fontWeight: 'bold',
                color: 'dark.500',
                textAlign: 'center',
                marginBottom: '20px',
            }}>404</Typography>
            <Typography sx={{
                fontSize: { xs: '20px', sm: '30px' },
                fontWeight: 'bold',
                color: 'dark.500',
                textAlign: 'center',
                marginBottom: '10px',
            }}>Page Not Found</Typography>
            <Typography sx={{
                fontSize: { xs: '14px', sm: '20px' },
                color: 'dark.500',
                textAlign: 'center',
                marginBottom: '30px',
            }}>we’re sorry. the page you requested could no be found<br />Please go back to the home page</Typography>

            <Button
                category="secondary"
                size={isBrowser ? 'medium' : 'small'}
                shape="round"
                width={isBrowser ? '200px' : '100%'}
                onClick={handleGoBack}
            >
                Go back
            </Button>
        </Box>
    )
}

export default NotFoundPage