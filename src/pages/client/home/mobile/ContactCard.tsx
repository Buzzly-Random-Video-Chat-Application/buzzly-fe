import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '@components/ui/Button';
import CustomFormInput from '@components/CustomFormInput';
import { useCreateFeedbackMutation } from '@apis/feedbackApi';
import PopupModal from '@components/PopupModal';

const ContactCard = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [createFeedback, { isLoading, isSuccess, isError }] = useCreateFeedbackMutation();
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);

    const handleCloseSuccessModal = () => setOpenSuccessModal(false);
    const handleOpenSuccessModal = () => setOpenSuccessModal(true);
    const handleCloseErrorModal = () => setOpenErrorModal(false);
    const handleOpenErrorModal = () => setOpenErrorModal(true);

    // Handle success and error states
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
                bgcolor: 'white.50',
                borderRadius: '25px',
                padding: '20px',
                border: '1px solid',
                borderColor: 'dark.500',
                boxShadow: '3px 3px 0px 0px #191A23',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <CustomFormInput
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <CustomFormInput
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <CustomFormInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!email && !/^\S+@\S+\.\S+$/.test(email)}
                    helperText={email && !/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
                />
                <CustomFormInput
                    type="textarea"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    shape="round"
                    category="primary"
                    width="auto"
                    size="small"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: 'dark.500' }} size={24} /> : 'Send Message'}
                </Button>
            </Box>
            <PopupModal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                title="Send Message Successfully"
                message="Your message has been sent successfully. Check your email for confirmation."
                onConfirm={handleCloseSuccessModal}
                stage="success"
                width="sm"
            />
            <PopupModal
                open={openErrorModal}
                onClose={handleCloseErrorModal}
                title="Send Message Failed"
                message={'An error occurred while sending your message. Please try again later.'}
                onConfirm={handleCloseErrorModal}
                stage="error"
                width="sm"
            />
        </Box>
    );
};

export default ContactCard;