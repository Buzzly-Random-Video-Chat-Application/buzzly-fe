import CustomFormInput from '@components/CustomFormInput';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import CustomButton from '@components/ui/Button';
import { isBrowser } from 'react-device-detect';
import { icons } from '@assets/index';
import { useForgotPasswordMutation } from '@apis/authApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string>('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();

    const validateEmail = (email: string): string => {
        if (!email) {
            return 'Email is required';
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return 'Invalid email address';
        }
        return '';
    };

    const handleForgotPassword = async () => {
        const error = validateEmail(email);
        setEmailError(error);

        if (error) {
            return;
        }

        try {
            const response = await forgotPassword(email).unwrap();
            navigate('/reset-password?token=' + response.token);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setEmailError('Failed to send reset email. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '50%' },
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
                    py: { xs: '20px', md: '50px' },
                    px: { xs: '10px', md: '50px' },
                    borderRadius: '10px',
                    gap: '20px',
                }}
            >
                <Typography variant={'h2'} fontWeight={600}>
                    Forgot Password
                </Typography>
                <Typography variant={'body1'}>
                    Please enter your email address to reset your password.
                </Typography>
                <CustomFormInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    required
                />
                <CustomButton
                    category="secondary"
                    shape="square"
                    size={isBrowser ? 'medium' : 'small'}
                    disableTouchRipple
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Confirm'}
                </CustomButton>
            </Box>
            <Box
                component={'img'}
                src={icons.illusabout}
                alt={'illustration-1'}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '-10%',
                }}
            />
            <Box
                component={'img'}
                src={icons.illusabout}
                alt={'illustration-2'}
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '-10%',
                }}
            />
            <Box
                component={'img'}
                src={icons.aboutstartdark}
                alt={'illustration-3'}
                sx={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '10%',
                }}
            />
            <Box
                component={'img'}
                src={icons.aboutstartlight}
                alt={'illustration-4'}
                sx={{
                    position: 'absolute',
                    top: '30%',
                    right: '10%',
                }}
            />
        </Box>
    );
};

export default ForgotPassword;