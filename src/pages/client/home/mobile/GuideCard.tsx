import { useState } from 'react';
import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { Box, Collapse, IconButton, Typography } from '@mui/material';

interface IGuide {
    index: number;
    title: string;
    description: string;
}

const GuideCard = ({ index, title, description }: IGuide) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Box sx={{
            padding: '20px',
            borderRadius: '25px',
            backgroundColor: isExpanded ? 'primary.500' : 'white.50',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '0px 3px 0px 0px #191A23'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '5px',
                }}>
                    <Typography variant="h3">{`0${index}`}</Typography>
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <IconButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    sx={{
                        border: '1px solid',
                        borderColor: 'dark.500',
                        padding: '2px',
                        transition: 'transform 0.3s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                >
                    {isExpanded ? <RemoveRounded /> : <AddRounded />}
                </IconButton>
            </Box>
            <Collapse in={isExpanded}>
                <Typography variant="body2" sx={{ mt: 2 }}>{description}</Typography>
            </Collapse>
        </Box>
    );
};

export default GuideCard;