import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { icons } from '@assets/index';
import toast from 'react-hot-toast';
import Button from '@components/ui/Button';
import { useCreateFeedbackMutation } from '@apis/feedbackApi';
import PopupModal from '@components/PopupModal';

interface ContactInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInput = ({ label, type, placeholder, value, onChange }: ContactInputProps) => (
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'10px'}>
        <Typography sx={{ color: 'dark.500', fontWeight: 500, fontSize: '20px' }}>{label}</Typography>
        <TextField
            variant="outlined"
            fullWidth
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            multiline={label === 'Message'}
            rows={label === 'Message' ? 5 : undefined}
            sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '14px',
                    backgroundColor: 'white.50',
                    '& fieldset': {
                        borderColor: 'gray.100',
                    },
                    '&:hover fieldset': {
                        borderColor: 'black.900',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black.900',
                        borderWidth: 1,
                    },
                },
                '& .MuiInputBase-input, & .MuiInputBase-inputMultiline': {
                    fontSize: 18,
                    color: 'dark.500',
                    '&::placeholder': {
                        color: 'gray.500',
                        opacity: 1,
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
);

const ContactCard = () => {
    const [name, setName] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [createFeedback, { isLoading, isSuccess, isError }] = useCreateFeedbackMutation();
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const [openErrorModal, setOpenErrorModal] = React.useState(false);


    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };
    const handleOpenSuccessModal = () => {
        setOpenSuccessModal(true);
    };

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false);
    };

    const handleOpenErrorModal = () => {
        setOpenErrorModal(true);
    };

    useEffect(() => {
        if (isSuccess) {
            handleOpenSuccessModal();
            resetForm();
        }
        if (isError) {
            handleOpenErrorModal();
        }
    }, [isSuccess, isError]);

    const validate = () => {
        if (!name || !title || !email || !message) {
            toast.error('Please fill in all fields');
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Invalid email address');
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setName('');
        setTitle('');
        setEmail('');
        setMessage('');
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        try {
            const feedback = {
                name,
                email,
                title,
                message,
            };

            await createFeedback(feedback).unwrap();
        } catch (err) {
            console.error('Error sending feedback:', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                marginY: '50px',
                bgcolor: 'white.50',
                borderRadius: '45px',
                paddingY: '2%',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: '5px 5px 0px 0px #191A23',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', width: { xs: '100%', md: '60%' }, marginLeft: '5%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
                    <ContactInput label="Name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <ContactInput label="Title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Box>
                <ContactInput label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <ContactInput
                    label="Message"
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button shape="round" category="primary" width="auto" size="medium" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={35} /> : 'Send Message'}
                </Button>
            </Box>
            <Box sx={{ width: { xs: '0%', md: '40%' }, maxWidth: '500px', display: { xs: 'block', md: 'block' } }}>
                <img src={icons.contact} alt="contact" width="100%" />
            </Box>

            <PopupModal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                title={'Send Message Successfully'}
                message={'Your message has been sent successfully. Check your email for confirmation.'}
                onConfirm={handleCloseSuccessModal}
                stage="success"
                width='sm'
            />

            <PopupModal
                open={openErrorModal}
                onClose={handleCloseErrorModal}
                title={'Send Message Failed'}
                message={'An error occurred while sending your message. Please try again later.'}
                onConfirm={handleCloseErrorModal}
                stage="error"
                width='sm'
            />
        </Box>
    );
};

export default ContactCard;