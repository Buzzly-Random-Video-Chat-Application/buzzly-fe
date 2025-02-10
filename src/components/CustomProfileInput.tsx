import { EmailRounded, PersonRounded, WcRounded, AddLocationAltRounded } from '@mui/icons-material';
import { Box, TextField, InputAdornment, MenuItem } from '@mui/material';
import React from 'react';

interface CustomProfileInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    options?: string[];
}

const CustomProfileInput = ({ label, placeholder, value, onChange, disabled, options }: CustomProfileInputProps) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" gap="10px">
            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                select={!!options}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ color: 'dark.500' }}>
                            {label === 'name' ? <PersonRounded /> : label === 'email' ? <EmailRounded /> : label === 'gender' ? <WcRounded /> : <AddLocationAltRounded />}
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '6px',
                        backgroundColor: 'white.600',
                        '& fieldset': {
                            borderWidth: 0,
                        },
                        '&:hover fieldset': {
                            borderWidth: 0,
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: 0,
                        },
                    },
                    '& .MuiInputBase-input': {
                        fontSize: 18,
                        color: 'dark.500',
                    },
                }}
            >
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default CustomProfileInput;
