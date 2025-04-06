import { Box, Typography, TextField } from '@mui/material'
import React from 'react'
import { icons } from '../../../../assets';
import toast from 'react-hot-toast';
import Button from '../../../../components/ui/Button';

interface ContactInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInput = ({ label, type, placeholder, value, onChange }: ContactInputProps) => (
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'10px'}>
        <Typography sx={{ color: 'dark.500', fontWeight: 500, fontSize: '20px' }}>
            {label}
        </Typography>
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
    const [name, setName] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const validate = () => {
        if (!name || !title || !email || !message) {
            toast.error('Please fill in all fields')
            return false
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Invalid email address')
            return false
        }
        return true
    }

    const handleSubmit = () => {
        if (validate()) {
            toast.success('Message sent successfully')
        }
    }

    return (
        <Box sx={{
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
            alignItems: 'center'
        }
        } >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', width: { xs: '100%', md: '60%' }, marginLeft: '5%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
                    <ContactInput
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <ContactInput
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>
                <ContactInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <ContactInput
                    label="Message"
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                    shape="round"
                    category="primary"
                    width='auto'
                    size='medium'
                    onClick={handleSubmit}
                >
                    Send Message
                </Button>
            </Box>
            <Box sx={{
                width: { xs: '0%', md: '40%' },
                maxWidth: '500px',
                display: { xs: 'block', md: 'block' },
            }}>
                <img src={icons.contact} alt="contact" width="100%" />
            </Box>
        </Box >
    )
}

export default ContactCard