import { useState } from 'react';
import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { Box, Collapse, Divider, IconButton, Typography } from '@mui/material';

interface GuideProps {
    index: number;
    title: string;
    description: string;
}

const GuideCard = ({ index, title, description }: GuideProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCard = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box
            onClick={toggleCard}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px',
                borderRadius: '35px',
                backgroundColor: isExpanded ? 'primary.500' : 'light.500',
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: '0px 5px 0px 0px #191A23',
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                "&:hover": {
                    boxShadow: '0px 10px 0px 0px #191A23',
                    transform: 'translateY(-5px)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '50px',
                        userSelect: 'none',
                    }}
                >
                    <Typography variant="h1">0{index}</Typography>
                    <Typography variant="h3">{title}</Typography>
                </Box>
                <IconButton
                    onClick={toggleCard}
                    sx={{
                        border: '1px solid',
                        borderColor: 'dark.500',
                        borderRadius: '50%',
                        padding: '5px',
                        backgroundColor: 'light.500',
                        ":hover": { backgroundColor: 'light.500' },
                        transition: 'transform 0.3s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                >
                    {isExpanded ? (
                        <RemoveRounded fontSize="large" sx={{ color: 'dark.500' }} />
                    ) : (
                        <AddRounded fontSize="large" sx={{ color: 'dark.500' }} />
                    )}
                </IconButton>
            </Box>

            <Collapse in={isExpanded}>
                <Divider sx={{ backgroundColor: 'dark.500', height: '1.5px', marginY: '20px' }} />
                <Typography variant="body1" sx={{ userSelect: 'none' }}>{description}</Typography>
            </Collapse>
        </Box>
    );
};

export default GuideCard;
