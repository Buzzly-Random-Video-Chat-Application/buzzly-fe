import { Box } from '@mui/material'
import React from 'react'

interface ProgressBarProps {
    progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <Box sx={{
            width: '100%',
            height: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '10px',
        }}>
            <Box sx={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: 'primary.500',
                borderRadius: '10px',
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'width 1s ease',
            }} />
        </Box>
    )
}

export default ProgressBar