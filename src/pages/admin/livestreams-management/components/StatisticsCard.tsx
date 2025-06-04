import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { percentageColor } from '@utils/colorUtils';

interface StatisticsCardProps {
    color: 'primary' | 'dark' | 'light' | 'black' | 'white' | 'gray' | 'green' | 'red' | 'yellow' | 'blue';
    title: string;
    count: number;
    percentage: {
        color: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
        amount: number;
        label: string;
    };
    icon: React.ReactNode;
}

function StatisticsCard({ color = 'dark', title, count, percentage, icon }: StatisticsCardProps) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                padding: '1rem 2rem',
                border: '1px solid #F0F1F2',
            }}
        >
            {/* Icon bên trái */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${color}.${percentage.color}`,
                    borderRadius: '8px',
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    top: '10%',
                    left: '20px',
                    transform: 'translateY(-50%)',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                }}>{icon}</Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1.2rem',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#191A23', fontWeight: 600 }}>
                        {count}
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        flexShrink: 0,
                        borderTop: '0px solid rgba(0, 0, 0, 0.12)',
                        borderRight: '0px solid rgba(0, 0, 0, 0.12)',
                        borderLeft: '0px solid rgba(0, 0, 0, 0.12)',
                        backgroundColor: 'transparent',
                        height: '0.0625rem',
                        borderBottom: 'none',
                        opacity: 0.25,
                        backgroundImage: 'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important',
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: percentageColor(percentage.amount),
                                fontWeight: 500,
                            }}
                        >
                            {percentage.amount}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>
                            {percentage.label}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default StatisticsCard;