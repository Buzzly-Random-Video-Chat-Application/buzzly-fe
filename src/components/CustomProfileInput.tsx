import {
    EmailRounded,
    PersonRounded,
    WcRounded,
    AddLocationAltRounded,
    TagRounded,
    LanguageRounded,
    CreditCard,
    AdminPanelSettings,
} from '@mui/icons-material';
import { Box, TextField, InputAdornment, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface Option {
    name: string;
    value: string; // Used for value (e.g., country code)
}

interface CustomProfileInputProps {
    label: string;
    placeholder: string;
    value: string | string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => void;
    disabled?: boolean;
    options?: string[] | Option[]; // Support both string[] and Option[]
    multiline?: boolean;
    maxLength?: number;
}

const CustomProfileInput = ({
    label,
    placeholder,
    value,
    onChange,
    disabled,
    options,
    multiline,
    maxLength,
}: CustomProfileInputProps) => {
    const getIcon = () => {
        switch (label.toLowerCase()) {
            case 'id':
                return <CreditCard />;
            case 'name':
                return <PersonRounded />;
            case 'email':
                return <EmailRounded />;
            case 'gender':
                return <WcRounded />;
            case 'nationality':
                return <AddLocationAltRounded />;
            case 'role':
                return <AdminPanelSettings />;
            case 'hashtags':
                return <TagRounded />;
            case 'preferredlanguage':
                return <LanguageRounded />;
            case 'location':
                return <AddLocationAltRounded />;
            default:
                return <PersonRounded />;
        }
    };

    const isMultiSelect = label.toLowerCase() === 'hashtags' || label.toLowerCase() === 'preferredlanguage';

    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" gap="10px">
            {isMultiSelect && options ? (
                <Select
                    multiple
                    fullWidth
                    value={Array.isArray(value) ? value : []}
                    onChange={onChange as (e: SelectChangeEvent<string[]>) => void}
                    disabled={disabled}
                    renderValue={(selected) => {
                        const selectedArray = selected as string[];
                        if (selectedArray.length === 0) return placeholder;
                        // For preferredLanguage, map codes to names; for hashtags, use the values directly
                        if (label.toLowerCase() === 'preferredlanguage' && Array.isArray(options) && options[0] && typeof options[0] === 'object' && 'name' in options[0]) {
                            return selectedArray
                                .map((code) => (options as Option[]).find((opt) => opt.value === code)?.name || code)
                                .join(', ');
                        }
                        return selectedArray.join(', ');
                    }}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 300,
                                overflowY: 'auto',
                                scrollbarWidth: 'none',
                            },
                        },
                    }}
                    sx={{
                        '&.MuiSelect-root': {
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
                    }}
                    startAdornment={
                        <InputAdornment position="start" sx={{ color: 'dark.500' }}>
                            {getIcon()}
                        </InputAdornment>
                    }
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={typeof option === 'object' && 'value' in option ? option.value : option}
                        >
                            {typeof option === 'object' && 'name' in option ? option.name : option}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    placeholder={placeholder}
                    value={typeof value === 'string' ? value : ''}
                    onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                    disabled={disabled}
                    select={!!options && !isMultiSelect}
                    multiline={multiline}
                    rows={multiline ? 4 : undefined}
                    inputProps={{ maxLength }}
                    InputProps={{
                        startAdornment: !multiline ? (
                            <InputAdornment position="start" sx={{ color: 'dark.500' }}>
                                {getIcon()}
                            </InputAdornment>
                        ) : undefined,
                    }}
                    SelectProps={{
                        MenuProps: {
                            PaperProps: {
                                style: {
                                    maxHeight: 300,
                                    overflowY: 'auto',
                                    scrollbarWidth: 'none',
                                },
                            },
                        },
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
                        <MenuItem
                            key={index}
                            value={typeof option === 'object' && 'value' in option ? option.value : option}
                        >
                            {typeof option === 'object' && 'name' in option ? option.name : option}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </Box>
    );
};

export default CustomProfileInput;