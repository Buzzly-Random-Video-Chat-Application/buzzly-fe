import React, { useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Avatar,
} from '@mui/material';
import { CloudUpload, FileUpload } from '@mui/icons-material';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

const ImportData = () => {
    const [importedBlogs, setImportedBlogs] = useState<IBlog[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let file: File | undefined;

        if ('dataTransfer' in event) {
            // Drag and Drop event
            event.preventDefault();
            file = event.dataTransfer.files?.[0];
        } else {
            // Input change event
            file = event.target.files?.[0];
        }

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const parsedBlogs = result.data.map((row: unknown, index: number) => {
                        const blogRow = row as Partial<IBlog>;
                        let content: IBlog['content'] = [{ intro: '', sections: [] }];

                        if (blogRow.content && typeof blogRow.content === 'string') {
                            try {
                                const parsedContent = JSON.parse(blogRow.content);
                                if (Array.isArray(parsedContent) && parsedContent.every(item =>
                                    typeof item === 'object' &&
                                    'intro' in item &&
                                    Array.isArray(item.sections)
                                )) {
                                    content = parsedContent;
                                } else {
                                    toast.error(`Invalid content format for blog at index ${index}`);
                                }
                            } catch (error) {
                                toast.error(`Error parsing content for blog at index ${index}`);
                                console.error('Parse error:', error);
                            }
                        }

                        return {
                            id: blogRow.id || `temp-${index}`,
                            title: blogRow.title || '',
                            author: {
                                id: blogRow.author?.id || `author-${index}`,
                                name: blogRow.author?.name || 'Unknown',
                                avatar: blogRow.author?.avatar || '',
                                email: blogRow.author?.email || '',
                                gender: blogRow.author?.gender || '',
                                nationality: blogRow.author?.nationality || '',
                                role: blogRow.author?.role || '',
                                isShowReview: blogRow.author?.isShowReview || false,
                                isOnline: blogRow.author?.isOnline || false,
                                isEmailVerified: blogRow.author?.isEmailVerified || false,
                                hashTags: blogRow.author?.hashTags || [],
                                aboutMe: blogRow.author?.aboutMe || '',
                                preferredLanguage: blogRow.author?.preferredLanguage || [],
                                location: blogRow.author?.location || '',
                            },
                            label: blogRow.label || '',
                            createdAt: blogRow.createdAt ? new Date(blogRow.createdAt) : new Date(),
                            updatedAt: blogRow.updatedAt ? new Date(blogRow.updatedAt) : new Date(),
                            deleteAt: blogRow.deleteAt ? new Date(blogRow.deleteAt) : null,
                            isPinned: blogRow.isPinned === true,
                            image: blogRow.image || '',
                            image_title: blogRow.image_title || '',
                            description: blogRow.description || '',
                            content,
                        };
                    });
                    setImportedBlogs(parsedBlogs as IBlog[]);
                    setIsDragging(false);
                },
                header: true,
                skipEmptyLines: true,
            });
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            {importedBlogs.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        border: '2px dashed #bdbdbd',
                        borderRadius: '8px',
                        bgcolor: isDragging ? 'gray.100' : 'transparent',
                        transition: 'background-color 0.2s ease',
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileChange}
                >
                    <CloudUpload sx={{ fontSize: 48, color: 'gray.500', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: 'gray.600', mb: 1 }}>
                        Drag&Drop files here
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray.500', mb: 2 }}>
                        or
                    </Typography>
                    <Button
                        component="label"
                        variant="contained"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white.50',
                            bgcolor: 'dark.500',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                            border: '1px solid #F0F1F2',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            '&:hover': {
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        Browse Files
                        <input
                            type="file"
                            accept=".csv"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<FileUpload />}
                            sx={{
                                borderColor: 'gray.200',
                                color: 'dark.500',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                textTransform: 'none',
                            }}
                        >
                            Import Another File
                            <input
                                type="file"
                                accept=".csv"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                        <Table sx={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600, flex: 1 }}>Title</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Author</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Label</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Updated At</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Deleted At</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {importedBlogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '100px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {blog.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar
                                                    src={blog.image || ''}
                                                    alt={blog.title}
                                                    sx={{ width: 32, height: 32 }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        flex: 1,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {blog.title}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar
                                                    src={blog.author.avatar || ''}
                                                    alt={blog.author.name}
                                                    sx={{ width: 32, height: 32 }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        maxWidth: '150px',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {blog.author.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '100px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {blog.label}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '100px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '100px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: '100px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {blog.deleteAt
                                                    ? new Date(blog.deleteAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })
                                                    : '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: 'fit-content' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: '50%',
                                                        bgcolor: blog.isPinned ? '#4caf50' : '#bdbdbd',
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {blog.isPinned ? 'Pinned' : 'Normal'}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default ImportData;