import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

interface CustomFormInputProps {
    label: string
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}

const CustomFormInput = ({ label, type, placeholder, value, onChange, error, helperText, disabled }: CustomFormInputProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'10px'}>
            <Typography variant="body1">
                {label}
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                disabled={disabled}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '6px',
                        '& fieldset': {
                            borderColor: error ? 'red.500' : 'gray.100',
                        },
                        '&:hover fieldset': {
                            borderColor: error ? 'red.500' : 'black.900',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: error ? 'red.500' : 'black.900',
                            borderWidth: 1,
                        },
                        '& .MuiInputBase-input': {
                            fontSize: 18,
                        },
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                }}
            />
        </Box>
    )
}

export default CustomFormInput