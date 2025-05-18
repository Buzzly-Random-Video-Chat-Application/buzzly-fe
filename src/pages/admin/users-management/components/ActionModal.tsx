import { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import CustomDialog from '@components/CustomDialog';
import CustomProfileInput from '@components/CustomProfileInput';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import { UPDATE_PROFILE_SUCCESS_MESSAGE, UPDATE_PROFILE_ERROR_MESSAGE } from '@constants/messages';
import { countries } from '@constants/country';
import { genders } from '@constants/gender';
import { useUpdateUserMutation } from '@apis/userApi';
import { locations } from '@constants/location';
import { hashtags } from '@constants/hashtags';

interface ActionModalProps {
    open: boolean;
    onClose: () => void;
    action: 'view' | 'edit';
    user: IUser | null;
}

const ActionModal = ({ open, onClose, action, user }: ActionModalProps) => {
    const [formData, setFormData] = useState<IUser | null>(null);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                hashTags: Array.isArray(user.hashTags) ? user.hashTags : [],
                preferredLanguage: Array.isArray(user.preferredLanguage) ? user.preferredLanguage : [],
            });
        }
    }, [user]);

    const handleInputChange = (field: keyof IUser) => () => {
        if (formData) {
            setFormData({
                ...formData,
                [field]: field === 'hashTags' || field === 'preferredLanguage'
                    ? formData[field].map((item) => item)
                    : formData[field],
            });
        }
    };

    const handleSave = async () => {
        if (!formData || !user?.id) {
            toast.error('User data or ID is missing');
            return;
        }

        const userData = {
            name: formData.name,
            gender: formData.gender,
            nationality: formData.nationality,
            aboutMe: formData.aboutMe,
            location: formData.location,
            hashTags: Array.isArray(formData.hashTags) ? formData.hashTags : [],
            preferredLanguage: Array.isArray(formData.preferredLanguage) ? formData.preferredLanguage : [],
        };

        try {
            await updateUser({ userId: user.id, userData }).unwrap();
            toast.success(UPDATE_PROFILE_SUCCESS_MESSAGE);
            onClose();
        } catch (error) {
            toast.error(UPDATE_PROFILE_ERROR_MESSAGE);
            console.error('Error updating user:', error);
        }
    };

    if (!user || !formData) {
        return null;
    }

    return (
        <CustomDialog open={open} onClose={onClose} maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {action === 'view' ? 'User Details' : 'Edit User'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Avatar src={user.avatar || ''} alt={user.name} sx={{ width: 120, height: 120 }} />
                </Box>

                <CustomProfileInput
                    label="id"
                    placeholder="Enter ID"
                    value={formData.id}
                    onChange={handleInputChange('id')}
                    disabled={true}
                />

                <CustomProfileInput
                    label="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    disabled={action === 'view'}
                />

                <CustomProfileInput
                    label="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={true}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomProfileInput
                        label="gender"
                        placeholder="Select gender"
                        value={formData.gender}
                        onChange={handleInputChange('gender')}
                        disabled={action === 'view'}
                        options={genders.map((g) => g.label)}
                    />

                    <CustomProfileInput
                        label="nationality"
                        placeholder="Select nationality"
                        value={formData.nationality}
                        onChange={handleInputChange('nationality')}
                        disabled={action === 'view'}
                        options={countries.map((c) => ({ label: c.label, value: c.value }))}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomProfileInput
                        label="role"
                        placeholder="Select role"
                        value={formData.role}
                        onChange={handleInputChange('role')}
                        disabled={true}
                        options={['user', 'admin']}
                    />
                    <CustomProfileInput
                        label="location"
                        placeholder="Select location"
                        value={formData.location}
                        onChange={handleInputChange('location')}
                        disabled={action === 'view'}
                        options={locations.map((l) => l.label)}
                    />
                </Box>

                <CustomProfileInput
                    label="hashtags"
                    placeholder="Select hashtags"
                    value={formData.hashTags}
                    onChange={handleInputChange('hashTags')}
                    disabled={action === 'view'}
                    options={hashtags}
                />

                <CustomProfileInput
                    label="preferredLanguage"
                    placeholder="Select languages"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange('preferredLanguage')}
                    disabled={action === 'view'}
                    options={countries.map((c) => ({ label: c.label, value: c.value }))}
                />

                <CustomProfileInput
                    label="aboutMe"
                    placeholder="Tell us about yourself (max 250 characters)"
                    value={formData.aboutMe}
                    onChange={handleInputChange('aboutMe')}
                    disabled={action === 'view'}
                    multiline
                    maxLength={250}
                />

                {action === 'edit' && (
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            shape="square"
                            category="default"
                            width="100%"
                            size="small"
                            onClick={onClose}
                            disabled={isUpdating}
                        >
                            Cancel
                        </Button>
                        <Button
                            shape="square"
                            category="primary"
                            width="100%"
                            size="small"
                            onClick={handleSave}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                )}
            </Box>
        </CustomDialog>
    );
};

export default ActionModal;