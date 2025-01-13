import { Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import { icons } from '../../../assets';

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

    return (
        <Box sx={{
            display: 'flex',
            marginY: '50px',
            bgcolor: 'light.500',
            borderRadius: '45px',
            paddingX: '100px',
            paddingY: '50px',
            justifyContent: 'space-between',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '60%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
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
                        placeholder="Enter your title"
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

                <Button sx={{
                    backgroundColor: 'primary.500',
                    color: 'dark.500',
                    paddingX: '50px',
                    paddingY: '15px',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px 0px #191A23',
                    border: '1px solid #191A23',
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    fontSize: '20px',
                    ":hover": {
                        boxShadow: '5px 5px 0px 0px #191A23',
                        transform: 'translateY(-5px)',
                    }
                }}>
                    Send Message
                </Button>
            </Box>
            <Box
                component={'img'}
                src={icons.contact}
                alt='contact'
                sx={{ width: '500px', height: '500px', objectFit: 'contain', marginRight: '-330px' }}
            />
        </Box >
    )
}

export default ContactCard