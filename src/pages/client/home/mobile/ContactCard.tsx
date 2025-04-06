import { useState } from 'react';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';
import Button from '../../../../components/ui/Button';
import CustomFormInput from '../../../../components/CustomFormInput';

const ContactCard = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

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

    const handleSubmit = () => {
        if (validate()) {
            toast.success('Message sent successfully');
        }
    };

    return (
        <Box sx={{
            bgcolor: 'white.50',
            borderRadius: '25px',
            padding: '20px',
            border: '1px solid',
            borderColor: 'dark.500',
            boxShadow: '3px 3px 0px 0px #191A23'
        }}>
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
                    width='auto'
                    size='small'
                    onClick={handleSubmit}
                >
                    Send Message
                </Button>
            </Box>
        </Box>
    );
};

export default ContactCard;