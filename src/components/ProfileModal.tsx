import React, { useRef, useState } from 'react'
import { IUser } from '../types/user'
import CustomDialog from './CustomDialog';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { AutoFixHighRounded } from '@mui/icons-material';
import CustomProfileInput from './CustomProfileInput';
import { Countries } from '../constants/country';
import { Genders } from '../constants/gender';
import { useUpdateUserMutation } from '../apis/userApi';
import toast from 'react-hot-toast';
import { UPDATE_PROFILE_ERROR_MESSAGE, UPDATE_PROFILE_SUCCESS_MESSAGE } from '../constants/messages';

interface ProfileModalProps {
    user: IUser | null;
    open: boolean;
    onClose: () => void;
}

const ProfileModal = ({ user, open, onClose }: ProfileModalProps) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [nationality, setNationality] = useState(user?.nationality || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleEditAvatar = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }
        formData.append('gender', gender);
        formData.append('nationality', nationality);

        updateUser({ userId: user?.id, formData }).unwrap()
            .then(() => {
                toast.success(UPDATE_PROFILE_SUCCESS_MESSAGE);
            })
            .catch((error) => {
                toast.error(UPDATE_PROFILE_ERROR_MESSAGE);
                console.error(error);
            });
    };

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Typography variant='h4' fontWeight={'bold'}>Edit Profile</Typography>

            <Box sx={{
                position: 'relative',
                width: '50%',
                height: '200px',
                backgroundColor: 'light.500',
                borderRadius: '10px',
                cursor: 'pointer',
                overflow: 'hidden',
                marginTop: '20px'
            }}>
                {/* Hiển thị ảnh đại diện */}
                <img
                    src={avatar}
                    alt={user?.name}
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'
                    }}
                />

                {/* Input file ẩn */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {/* Icon chỉnh sửa */}
                <IconButton onClick={handleEditAvatar} sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'primary.500',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'primary.600'
                    }
                }}>
                    <AutoFixHighRounded />
                </IconButton>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '20px'
            }}>
                <Typography variant='h4'>My Info</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <CustomProfileInput
                        label='name'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CustomProfileInput
                        label='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={true}
                    />
                    <CustomProfileInput
                        label='gender'
                        placeholder='Select your gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        options={Genders.map((gender) => gender.name)}
                    />
                    <CustomProfileInput
                        label="country"
                        placeholder="Select your country"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        options={Countries.map((country) => country.name)}
                    />
                </Box>
            </Box>

            <Button sx={{
                width: '100%',
                bgcolor: 'primary.500',
                color: 'dark.500',
                borderRadius: 1,
                padding: '10px',
                boxShadow: '3px 3px 0px 0px #191A23',
                transition: 'all 0.3s',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                marginTop: '20px',
                ":hover": {
                    boxShadow: '5px 5px 0px 0px #191A23',
                    transform: 'translateY(-5px)',
                },
                ":disabled": {
                    bgcolor: 'black.50',
                    color: 'black.200',
                    cursor: 'not-allowed',
                    borderColor: 'black.50',
                    boxShadow: '2px 2px 0px #191A23',
                    transform: 'none',
                }
            }} onClick={handleUpdateProfile} disabled={isLoading}>
                {isLoading ? <CircularProgress size={28} sx={{ color: 'dark.500' }} /> : 'Complete'}
            </Button>
        </CustomDialog>
    )
}

export default ProfileModal;
