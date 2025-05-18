import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomDialog from '@components/CustomDialog';
import RadioButton from './RadioButton';
import { countries } from '@constants/country';
import { useAppSelector } from '@stores/store';

interface CountryModalProps {
    open: boolean;
    onClose: () => void;
    onCountrySelect: (selectedCountry: string) => void;
    onStartVideoChat: () => void;
}

const CountryModal = ({ open, onClose, onCountrySelect, onStartVideoChat }: CountryModalProps) => {
    const { user } = useAppSelector((state) => state.user);
    const user_country = countries.find((country) => country.label === user?.nationality);
    const [countrySelected, setCountrySelected] = React.useState('Balanced');

    const handleCountryChange = (country: string) => {
        setCountrySelected(country);
        onCountrySelect(country.toLowerCase());
    };

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Typography sx={{
                fontWeight: 700,
                marginBottom: '20px',
                fontSize: { xs: '24px', md: '32px' }
            }}>
                Regional Priority
            </Typography>
            <RadioButton
                name="Balanced"
                isSelected={countrySelected === 'Balanced'}
                onClick={() => handleCountryChange('Balanced')}
            />
            {user &&
                <RadioButton
                    name={user_country?.label || ''}
                    isSelected={countrySelected === user_country?.label}
                    onClick={() => handleCountryChange(user_country?.label || '')}
                />
            }
            <Typography sx={{
                marginY: { xs: '10px', md: '20px' },
                fontWeight: 500,
                fontSize: { xs: '14px', md: '18px' }
            }}>
                Select the country you want to pair with
            </Typography>
            {countries.map((country, index) =>
                country.label !== user?.nationality && (
                    <RadioButton
                        key={index}
                        name={country.label}
                        isSelected={countrySelected === country.label}
                        onClick={() => handleCountryChange(country.label)}
                    />
                )
            )}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                mt: '20px',
                flexDirection: { xs: 'column', md: 'row' },
            }}>
                <Button
                    sx={{
                        flex: 1,
                        bgcolor: 'primary.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        padding: { xs: '8px', md: '10px' },
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: { xs: '14px', md: '16px' },
                        fontWeight: 500,
                        ':hover': {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                    onClick={() => {
                        onStartVideoChat();
                        onClose();
                    }}
                >
                    Start Video Chat
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
                        bgcolor: 'white.50',
                        color: 'dark.500',
                        borderRadius: '30px',
                        border: '1px solid',
                        borderColor: 'dark.500',
                        paddingX: { xs: '15px', md: '20px' },
                        paddingY: '8px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: { xs: '14px', md: '16px' },
                        fontWeight: 500,
                        ':hover': {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                >
                    Close
                </Button>
            </Box>
        </CustomDialog>
    );
};

export default CountryModal;