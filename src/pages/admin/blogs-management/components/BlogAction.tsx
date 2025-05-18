import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Divider,
    IconButton,
    SelectChangeEvent,
} from '@mui/material';
import { AddCircleOutline, Apple, Delete, Google, PushPin } from '@mui/icons-material';
import toast from 'react-hot-toast';
import {
    useCreateBlogMutation,
    useUpdateBlogMutation,
} from '@apis/blogApi';
import { useAppSelector, RootState } from '@stores/store';
import { isBrowser } from 'react-device-detect';
import { icons } from '@assets/index';
import CustomButton from '@components/ui/Button';

interface BlogActionProps {
    action: string;
    blog?: IBlog;
    setActiveTab: (React.Dispatch<React.SetStateAction<string>>);
}

const BlogAction = ({ action, blog, setActiveTab }: BlogActionProps) => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<Partial<IBlog>>({
        label: '',
        title: '',
        description: '',
        image: '',
        image_title: '',
        content: [{ intro: '', sections: [] }],
        author: user || undefined,
        isPinned: false,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // API hooks
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

    // Labels for the select dropdown
    const labels = ['Making Friends', 'Safety', 'Conversation Topics'];

    // Initialize form data when editing or viewing
    useEffect(() => {
        if (action !== 'add' && blog) {
            setFormData({
                ...blog,
                content: blog.content || [{ intro: '', sections: [] }],
            });
            setImageFile(null); // Reset imageFile khi chỉnh sửa
        } else if (action === 'add') {
            setFormData({
                label: '',
                title: '',
                description: '',
                image: '',
                image_title: '',
                content: [{ intro: '', sections: [] }],
                author: user || undefined,
                isPinned: false,
            });
            setImageFile(null); // Reset imageFile khi thêm mới
        }
    }, [action, user, blog]);

    // Handle text input and select changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle content changes (intro and sections)
    const handleContentChange = (contentIndex: number, field: string, value: string) => {
        setFormData((prev) => {
            const newContent = [...(prev.content || [])];
            newContent[contentIndex] = {
                ...newContent[contentIndex],
                [field]: value,
            };
            return { ...prev, content: newContent };
        });
    };

    // Handle section changes
    const handleSectionChange = (
        contentIndex: number,
        sectionIndex: number,
        field: string,
        value: string | string[]
    ) => {
        setFormData((prev) => {
            const newContent = [...(prev.content || [])];
            const newSections = [...(newContent[contentIndex].sections || [])];
            newSections[sectionIndex] = {
                ...newSections[sectionIndex],
                [field]: value,
            };
            newContent[contentIndex] = {
                ...newContent[contentIndex],
                sections: newSections,
            };
            return { ...prev, content: newContent };
        });
    };

    // Add a new content block
    const addContentBlock = () => {
        setFormData((prev) => ({
            ...prev,
            content: [...(prev.content || []), { intro: '', sections: [] }],
        }));
    };

    // Add a new section to a content block
    const addSection = (contentIndex: number) => {
        setFormData((prev) => {
            const newContent = [...(prev.content || [])];
            newContent[contentIndex].sections = [
                ...(newContent[contentIndex].sections || []),
                { title: '', paragraphs: [''], listItems: [''] },
            ];
            return { ...prev, content: newContent };
        });
    };

    // Remove a content block
    const removeContentBlock = (contentIndex: number) => {
        setFormData((prev) => ({
            ...prev,
            content: (prev.content || []).filter((_, index) => index !== contentIndex),
        }));
    };

    // Remove a section
    const removeSection = (contentIndex: number, sectionIndex: number) => {
        setFormData((prev) => {
            const newContent = [...(prev.content || [])];
            newContent[contentIndex].sections = newContent[contentIndex].sections.filter(
                (_, index) => index !== sectionIndex
            );
            return { ...prev, content: newContent };
        });
    };

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Removed automatic setting of image_title
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.label || !formData.title || !formData.description || !formData.image_title) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Clean up content to remove empty listItems
        const cleanedContent = formData.content?.map((content) => ({
            ...content,
            sections: content.sections?.map((section) => ({
                ...section,
                listItems: section.listItems?.filter((item) => item.trim() !== '') || [],
            })),
        }));

        const formDataToSend = new FormData();
        formDataToSend.append('label', formData.label || '');
        formDataToSend.append('title', formData.title || '');
        formDataToSend.append('description', formData.description || '');
        formDataToSend.append('image_title', formData.image_title || '');
        formDataToSend.append('content', JSON.stringify(cleanedContent));
        formDataToSend.append('isPinned', String(formData.isPinned));

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            if (action === 'add') {
                await createBlog(formDataToSend).unwrap();
                toast.success('Blog created successfully');
                setTimeout(() => {
                    setActiveTab('TABLE');
                }, 1000);
            } else if (action === 'edit' && blog?.id) {
                await updateBlog({ blogId: blog.id, blogData: formDataToSend }).unwrap();
                toast.success('Blog updated successfully');
                setTimeout(() => {
                    setActiveTab('TABLE');
                }, 1000);
            }
        } catch (error) {
            toast.error(`Error ${action === 'add' ? 'creating' : 'updating'} blog`);
            console.error('Error:', error);
        }
    };

    // Read-only view for 'view' action
    if (action === 'view') {
        return (
            <Box sx={{
                width: '100%',
                padding: 1,
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
                    <Typography variant="body1" sx={{ color: 'dark.500' }}>
                        {formData.label}
                    </Typography>
                    <Divider orientation="vertical" sx={{ height: '24px', mx: 2 }} />
                    <Typography variant="body1" sx={{ color: 'dark.500' }}>
                        {formData.createdAt
                            ? new Date(formData.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            : 'N/A'}
                    </Typography>
                </Box>

                {/* Tiêu đề */}
                <Typography variant="h3" sx={{ fontWeight: 700, mb: { xs: 2, md: 4 }, textAlign: 'left' }}>
                    {formData.title}
                </Typography>

                {/* Mô tả */}
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, md: 4 }, textAlign: 'left' }}>
                    {formData.description}
                </Typography>

                {/* Nút Start Video Chat */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: { xs: 4, md: 8 } }}>
                    <Button
                        variant="contained"
                        size={isBrowser ? 'medium' : 'small'}
                        sx={{ borderRadius: '50px', textTransform: 'none' }}
                    >
                        Start Video Chat
                    </Button>
                </Box>

                {/* Hình ảnh */}
                {formData.image && (
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                        <Box sx={{ flex: 2 }}>
                            <img
                                src={formData.image}
                                alt={formData.image_title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Typography variant="body2" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                                {formData.image_title}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {formData.content?.map((content, contentIndex) => {
                    return (
                        <Box key={contentIndex} sx={{ mb: 4 }}>
                            {/* Nội dung intro */}
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {content?.intro}
                            </Typography>

                            {/* Các section */}
                            {content?.sections?.map((section, index) => (
                                <Box key={index} sx={{ mb: 3 }}>
                                    <Typography variant="h3" sx={{ fontWeight: 600, mb: { xs: 2, md: 4 } }}>
                                        {section.title}
                                    </Typography>
                                    {section.paragraphs.map((paragraph, pIndex) => (
                                        <Typography key={pIndex} variant="body1" sx={{ mb: { xs: 2, md: 4 } }}>
                                            {paragraph}
                                        </Typography>
                                    ))}
                                    {section.listItems && (
                                        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                                            {section.listItems.map((item, iIndex) => (
                                                <li key={iIndex}>
                                                    <Typography
                                                        variant="body1"
                                                        dangerouslySetInnerHTML={{ __html: item }}
                                                    />
                                                </li>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )
                })}

                {/* Divider */}
                <Divider sx={{ my: 4 }} />

                {/* Footer với các nút tải ứng dụng */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <CustomButton icon={<Apple />} category="default" size="small" shape="pill" width="auto">
                        App Store
                    </CustomButton>
                    <CustomButton icon={<Google />} category="default" size="small" shape="pill" width="auto">
                        Google Play
                    </CustomButton>
                    <CustomButton
                        icon={<img src={icons.logo} alt="Buzzly" style={{ width: '24px', height: '24px' }} />}
                        category="default"
                        size="small"
                        shape="pill"
                        width="auto"
                    >
                        Buzzly Web
                    </CustomButton>
                </Box>
            </Box>
        );
    }

    // Form for 'add' or 'edit' actions
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            padding: 1,
        }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {action === 'add' ? 'Add New Blog' : 'Edit Blog'}
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    <IconButton
                        disableTouchRipple
                        disableFocusRipple
                        disableRipple
                        sx={{
                            padding: 1,
                            margin: 'none',
                            rotate: '45deg',
                            color: formData.isPinned ? 'primary.500' : 'gray.500',
                            backgroundColor: formData.isPinned ? 'dark.500' : 'none',
                        }}
                        onClick={() => setFormData((prev) => ({ ...prev, isPinned: !prev.isPinned }))}
                    >
                        <PushPin />
                    </IconButton>
                </Box>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel
                        id="label-select-label"
                        sx={{
                            color: 'gray.600',
                            '&.Mui-focused': {
                                color: 'dark.500',
                            },
                        }}
                    >
                        Label
                    </InputLabel>
                    <Select
                        name="label"
                        value={formData.label}
                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                        label="Label"
                        sx={{
                            '&.MuiSelect-root': {
                                '& fieldset': {
                                    borderWidth: 1,
                                    borderColor: 'gray.200'
                                },
                                '&:hover fieldset': {
                                    borderWidth: 1,
                                    borderColor: 'gray.300'
                                },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 1,
                                    borderColor: 'dark.500'
                                },
                            },
                        }}
                    >
                        {labels.map((label) => (
                            <MenuItem key={label} value={label}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    required
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.200'
                            },
                            '&:hover fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.300'
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                borderColor: 'dark.500'
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray.600',
                            '&.Mui-focused': {
                                color: 'dark.500',
                            },
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    multiline
                    rows={4}
                    required
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.200'
                            },
                            '&:hover fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.300'
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                borderColor: 'dark.500'
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray.600',
                            '&.Mui-focused': {
                                color: 'dark.500',
                            },
                        },
                    }}
                />

                {/* {
                    (action === 'add' && imageFile) || (action === 'edit' && (imageFile || formData.image)) ? (
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                            <img
                                src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                                alt={formData.image_title || formData.title}
                                style={{
                                    width: '50%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Box>
                    ) : null
                } */}

                <TextField
                    fullWidth
                    label="Image Title"
                    name="image_title"
                    value={formData.image_title}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    required
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.200'
                            },
                            '&:hover fieldset': {
                                borderWidth: 1,
                                borderColor: 'gray.300'
                            },
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                borderColor: 'dark.500'
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray.600',
                            '&.Mui-focused': {
                                color: 'dark.500',
                            },
                        },
                    }}
                />

                <CustomButton
                    component="label"
                    category="primary"
                    size="small"
                    shape="square"
                    width="fit-content"
                    sx={{ mb: 2 }}
                >
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </CustomButton>

                {imageFile && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Selected: {imageFile.name}
                    </Typography>
                )}

                {formData.content?.map((content, contentIndex) => (
                    <Box
                        key={contentIndex}
                        sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}
                    >
                        <Typography variant="h6" sx={{ mb: 4 }}>Content Block {contentIndex + 1}</Typography>
                        <TextField
                            fullWidth
                            label="Intro"
                            value={content.intro}
                            onChange={(e) => handleContentChange(contentIndex, 'intro', e.target.value)}
                            multiline
                            rows={3}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: 1,
                                        borderColor: 'gray.200'
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: 1,
                                        borderColor: 'gray.300'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: 1,
                                        borderColor: 'dark.500'
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'gray.600',
                                    '&.Mui-focused': {
                                        color: 'dark.500',
                                    },
                                },
                            }}
                        />

                        {content.sections?.map((section, sectionIndex) => (
                            <Box
                                key={sectionIndex}
                                sx={{ mb: 2, pl: 2, borderLeft: '2px solid #1976d2' }}
                            >
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>Section {sectionIndex + 1}</Typography>
                                <TextField
                                    fullWidth
                                    label="Section Title"
                                    value={section.title}
                                    onChange={(e) =>
                                        handleSectionChange(contentIndex, sectionIndex, 'title', e.target.value)
                                    }
                                    sx={{
                                        mb: 2,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.200'
                                            },
                                            '&:hover fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.300'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'dark.500'
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'gray.600',
                                            '&.Mui-focused': {
                                                color: 'dark.500',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Paragraphs (one per line)"
                                    value={section.paragraphs.join('\n')}
                                    onChange={(e) =>
                                        handleSectionChange(
                                            contentIndex,
                                            sectionIndex,
                                            'paragraphs',
                                            e.target.value.split('\n')
                                        )
                                    }
                                    multiline
                                    rows={3}
                                    sx={{
                                        mb: 2,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.200'
                                            },
                                            '&:hover fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.300'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'dark.500'
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'gray.600',
                                            '&.Mui-focused': {
                                                color: 'dark.500',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="List Items (one per line)"
                                    value={section.listItems.join('\n')}
                                    onChange={(e) =>
                                        handleSectionChange(
                                            contentIndex,
                                            sectionIndex,
                                            'listItems',
                                            e.target.value.split('\n')
                                        )
                                    }
                                    multiline
                                    rows={3}
                                    sx={{
                                        mb: 2,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.200'
                                            },
                                            '&:hover fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'gray.300'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderWidth: 1,
                                                borderColor: 'dark.500'
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'gray.600',
                                            '&.Mui-focused': {
                                                color: 'dark.500',
                                            },
                                        },
                                    }}
                                />
                                {action !== 'view' && (
                                    <IconButton
                                        onClick={() => removeSection(contentIndex, sectionIndex)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                )}
                            </Box>
                        ))}

                        {action !== 'view' && (
                            <Button
                                startIcon={<AddCircleOutline />}
                                onClick={() => addSection(contentIndex)}
                                sx={{ mb: 2, color: 'dark.500' }}
                            >
                                Add Section
                            </Button>
                        )}

                        {action !== 'view' && formData.content && formData.content.length > 1 && (
                            <Button
                                color="error"
                                onClick={() => removeContentBlock(contentIndex)}
                                sx={{ mb: 2 }}
                            >
                                Remove Content Block
                            </Button>
                        )}
                    </Box>
                ))}

                {action !== 'view' && (
                    <Button
                        startIcon={<AddCircleOutline />}
                        onClick={addContentBlock}
                        sx={{ mb: 2, color: 'dark.500' }}
                    >
                        Add Content Block
                    </Button>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomButton
                        type="submit"
                        category="primary"
                        size="small"
                        shape="square"
                        width="auto"
                        disabled={isCreating || isUpdating}
                        loading={isCreating || isUpdating}
                    >
                        {action === 'add' ? 'Create Blog' : 'Update Blog'}
                    </CustomButton>
                    <CustomButton
                        category="default"
                        size="small"
                        shape="square"
                        width="auto"
                        disabled={isCreating || isUpdating}
                        onClick={() => setActiveTab('TABLE')}
                    >
                        Cancel
                    </CustomButton>
                </Box>
            </form>
        </Box>
    );
};

export default BlogAction;