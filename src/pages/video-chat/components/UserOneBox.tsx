import { Box } from '@mui/material';
import React from 'react';

interface UserOneBoxProps {
    myVideoRef: React.RefObject<HTMLVideoElement>;
}

const UserOneBox = ({ myVideoRef }: UserOneBoxProps) => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <video
                ref={myVideoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
            />
        </Box>
    );
};

export default UserOneBox;