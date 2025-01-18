import { Box, Collapse } from '@mui/material'
import React from 'react'
import ChatBox from './ChatBox'
import ConnectingContainer from './ConnectingContainer'

const ConnectingCard = () => {
    const [openCollapse] = React.useState(true)
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: '10px'
        }}>
            <ConnectingContainer />
            <Collapse in={openCollapse} sx={{ display: 'flex', height: '100%', transition: 'all 0.3s ease-in-out' }} unmountOnExit>
                <ChatBox />
            </Collapse>
        </Box>
    )
}

export default ConnectingCard