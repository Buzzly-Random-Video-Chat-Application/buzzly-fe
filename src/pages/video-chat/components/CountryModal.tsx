import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomDialog from '../../../components/CustomDialog';
import RadioButton from './RadioButton';
import { Countries } from '../../../constants/country';

interface CountryModalProps {
    open: boolean;
    onClose: () => void;
}

const CountryModal = ({ open, onClose }: CountryModalProps) => {
    const user_country_code = 'VN';
    const user_country = Countries.find((country) => country.code === user_country_code);

    // Biến trạng thái để lưu country đã chọn
    const [countrySelected, setCountrySelected] = React.useState('Balanced');

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: '20px' }}>
                Regional Priority
            </Typography>
            {/* Radio buttons */}
            <RadioButton
                name="Balanced"
                isSelected={countrySelected === 'Balanced'}
                onClick={() => setCountrySelected('Balanced')}
            />
            <RadioButton
                name={user_country?.name || 'Unknown'}
                isSelected={countrySelected === user_country?.name}
                onClick={() => setCountrySelected(user_country?.name || 'Unknown')}
            />
            <Typography variant="body1" sx={{ marginY: '20px', fontWeight: 500 }}>
                Select the country you want to pair with
            </Typography>
            {Countries.map(
                (country, index) =>
                    country.code !== user_country_code && (
                        <RadioButton
                            key={index}
                            name={country.name}
                            isSelected={countrySelected === country.name}
                            onClick={() => setCountrySelected(country.name)}
                        />
                    )
            )}
            {/* Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    mt: '40px',
                }}
            >
                <Button
                    sx={{
                        flex: 1,
                        bgcolor: 'primary.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        padding: '10px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        ':hover': {
                            boxShadow: '5px 5px 0px 0px #191A23',
                            transform: 'translateY(-5px)',
                        },
                    }}
                >
                    Start Video Chat
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
                        bgcolor: 'light.500',
                        color: 'dark.500',
                        borderRadius: '30px',
                        border: '1px solid',
                        borderColor: 'dark.500',
                        paddingX: '20px',
                        paddingY: '10px',
                        boxShadow: '3px 3px 0px 0px #191A23',
                        transition: 'all 0.3s',
                        textTransform: 'none',
                        fontSize: '16px',
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
