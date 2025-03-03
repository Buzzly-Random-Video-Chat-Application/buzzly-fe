import { Box, Typography } from '@mui/material';
import { images } from '../../../assets';

const ImageScrollInfinity = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            borderRadius: '10px',
            gap: '10px',
            position: 'relative',
        }}>
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    borderRadius: '10px',
                    backgroundImage: `url(${images.vid1})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'repeat-y',
                    animationDuration: '32s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                    animationName: 'scrollUpAnimation',
                    '@keyframes scrollUpAnimation': {
                        '0%': { backgroundPositionY: '0%' },
                        '100%': { backgroundPositionY: '-100%' },
                    },
                }}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    borderRadius: '10px',
                    backgroundImage: `url(${images.vid2})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'repeat-y',
                    animationDuration: '32s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                    animationName: 'scrollDownAnimation',
                    '@keyframes scrollDownAnimation': {
                        '0%': { backgroundPositionY: '-100%' },
                        '100%': { backgroundPositionY: '0%' },
                    },
                }}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    borderRadius: '10px',
                    backgroundImage: `url(${images.vid3})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'repeat-y',
                    animationDuration: '32s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                    animationName: 'scrollUpAnimation',
                    '@keyframes scrollUpAnimation': {
                        '0%': { backgroundPositionY: '0%' },
                        '100%': { backgroundPositionY: '-100%' },
                    },
                }}
            />
            <Typography sx={{
                zIndex: 1,
                position: 'absolute',
                right: '10px',
                top: '10px',
                padding: '5px 10px',
                fontSize: '10px !important',
                color: 'light.500',
            }}>
                All images are of the model and are used for illustration purposes only.
            </Typography>
        </Box>
    );
};

export default ImageScrollInfinity;