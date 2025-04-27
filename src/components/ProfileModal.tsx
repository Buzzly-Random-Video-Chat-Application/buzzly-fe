import React, { useEffect, useRef, useState } from 'react';
import CustomDialog from './CustomDialog';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { AutoFixHighRounded } from '@mui/icons-material';
import CustomProfileInput from './CustomProfileInput';
import { countries } from '../constants/country';
import { genders } from '../constants/gender';
import { useUpdateUserMutation, useUpdateUserAvatarMutation } from '../apis/userApi';
import toast from 'react-hot-toast';
import { UPDATE_PROFILE_SUCCESS_MESSAGE, UPDATE_PROFILE_ERROR_MESSAGE } from '../constants/messages';
import { useAppSelector, RootState } from '@stores/store';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
}

const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [nationality, setNationality] = useState(user?.nationality || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setNationality(user.nationality);;
            setAvatar(user.avatar);
        }
    }, [user]);

    const [updateUser, { isLoading: isUpdatingProfile }] = useUpdateUserMutation();
    const [updateUserAvatar, { isLoading: isUpdatingAvatar }] = useUpdateUserAvatarMutation();

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
        const userData = {
            name,
            gender,
            nationality,
            hashTags: user?.hashTags || [],
            aboutMe: user?.aboutMe || '',
            preferredLanguage: user?.preferredLanguage || [],
            location: user?.location || '',
        };

        if (!user?.id) {
            toast.error('User ID is missing.');
            return;
        }
        updateUser({ userId: user.id, userData })
            .unwrap()
            .then(() => {
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('avatar', selectedFile);
                    return updateUserAvatar({ userId: user?.id, formData }).unwrap();
                }
            })
            .then(() => {
                toast.success(UPDATE_PROFILE_SUCCESS_MESSAGE);
                setSelectedFile(null);
            })
            .catch((error) => {
                toast.error(UPDATE_PROFILE_ERROR_MESSAGE);
                console.error('Error updating profile or avatar:', error);
            })
            .finally(() => {
                onClose();
            });
    };

    return (
        <CustomDialog open={open} onClose={onClose}>
            <Typography variant='h4' fontWeight={'bold'}>Edit Profile</Typography>

            <Box sx={{
                position: 'relative',
                width: '50%',
                height: '200px',
                backgroundColor: 'white.50',
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
                        onChange={(e) => setName(e.target.value as string)}
                    />
                    <CustomProfileInput
                        label='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value as string)}
                        disabled={true}
                    />
                    <CustomProfileInput
                        label='gender'
                        placeholder='Select your gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value as string)}
                        options={genders.map((gender) => gender.name)}
                    />
                    <CustomProfileInput
                        label="country"
                        placeholder="Select your country"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value as string)}
                        options={countries.map((country) => country.name)}
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
            }} onClick={handleUpdateProfile} disabled={isUpdatingProfile || isUpdatingAvatar}>
                {isUpdatingProfile || isUpdatingAvatar ? <CircularProgress size={28} sx={{ color: 'dark.500' }} /> : 'Complete'}
            </Button>
        </CustomDialog>
    )
}

export default ProfileModal;