import { Box, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

interface CustomFormInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}

const CustomFormInput = ({ label, type, placeholder, value, onChange, error, helperText, disabled }: CustomFormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'10px'}>
            <Typography variant="body1">
                {label}
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                disabled={disabled}
                autoComplete={type === 'password' ? 'new-password' : 'off'}
                InputProps={{
                    endAdornment: type === 'password' ? (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end" disableTouchRipple>
                                {showPassword ? <VisibilityOutlined sx={{ fontSize: 30, color: 'dark.500' }} /> : <VisibilityOffOutlined sx={{ fontSize: 30, color: 'dark.500' }} />}
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
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
                    '& input[type="password"]::-ms-reveal, & input[type="password"]::-ms-clear, & input[type="password"]::-webkit-credentials-auto-fill-button': {
                        display: 'none',
                    },
                }}
            />
        </Box>
    );
};

export default CustomFormInput;
