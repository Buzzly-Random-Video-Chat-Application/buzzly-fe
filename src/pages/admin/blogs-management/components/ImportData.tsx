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
    CircularProgress,
    IconButton,
    Collapse,
} from '@mui/material';
import { CloudUpload, ExpandMore, ExpandLess, GetApp } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { useAppSelector } from '@stores/store';
import { useImportBlogsMutation } from '@apis/blogApi';

const ImportData = () => {
    const [importedBlogs, setImportedBlogs] = useState<IBlog[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { user } = useAppSelector((state) => state.user);
    const [importBlogs] = useImportBlogsMutation();
    const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let file: File | undefined;

        if ('dataTransfer' in event) {
            event.preventDefault();
            file = event.dataTransfer.files?.[0];
        } else {
            file = event.target.files?.[0];
        }

        if (file) {
            if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.type)) {
                toast.error('Only Excel files (.xlsx, .xls) are supported');
                setIsDragging(false);
                return;
            }

            setSelectedFile(file);
            setIsLoading(true);

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Kiểm tra sự tồn tại của các sheet
                    const mainSheet = workbook.Sheets['Main Information'];
                    const contentSheet = workbook.Sheets['Content Details'];
                    if (!mainSheet || !contentSheet) {
                        toast.error('Excel file must contain "Main Information" and "Content Details" sheets');
                        setIsLoading(false);
                        return;
                    }

                    // Chuyển đổi sheet thành JSON
                    const mainData = XLSX.utils.sheet_to_json(mainSheet);
                    const contentData = XLSX.utils.sheet_to_json(contentSheet);

                    // Nhóm dữ liệu theo blog
                    const blogGroups: { [key: string]: IBlog } = {};

                    // Process Main Information sheet
                    (mainData as IMainInformationRow[]).forEach((row, index) => {
                        const blogTitle = row.title?.trim();
                        if (!blogTitle || !user) return;

                        blogGroups[blogTitle] = {
                            id: (index + 1).toString(),
                            title: blogTitle,
                            author: user,
                            label: row.label?.trim() || '',
                            description: row.description?.trim() || '',
                            image: row.image_url?.trim() || '',
                            image_title: row.image_title?.trim() || '',
                            content: [{ intro: row.intro_content?.trim() || '', sections: [] }],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            deleteAt: null,
                            isPinned: row.isPinned === 'true' || row.isPinned === true,
                        };
                    });

                    // Xử lý sheet Content Details
                    (contentData as IContentDetailsRow[]).forEach((row) => {
                        const blogTitle = row.blog_title?.trim();
                        const sectionTitle = row.section_title?.trim();
                        if (!blogTitle || !sectionTitle || !blogGroups[blogTitle]) return;

                        const blog = blogGroups[blogTitle];
                        let section = blog.content[0].sections.find((s) => s.title === sectionTitle);

                        if (!section) {
                            section = { title: sectionTitle, paragraphs: [], listItems: [] };
                            blog.content[0].sections.push(section);
                        }

                        if (row.paragraph?.trim()) {
                            section.paragraphs.push(row.paragraph.trim());
                        }
                        if (row.list_item?.trim()) {
                            section.listItems.push(row.list_item.trim());
                        }
                    });

                    // Validate và lọc các blog hợp lệ
                    const validBlogs = Object.values(blogGroups).filter((blog) => {
                        const hasRequiredFields =
                            blog.label &&
                            blog.title &&
                            blog.description &&
                            blog.image &&
                            blog.image_title &&
                            blog.content[0].intro;

                        const hasValidContent =
                            blog.content[0].sections.length > 0 &&
                            blog.content[0].sections.every(
                                (section) => section.title && (section.paragraphs.length > 0 || section.listItems.length > 0)
                            );

                        const isValid = hasRequiredFields && hasValidContent;

                        if (!isValid) {
                            if (!hasRequiredFields) {
                                toast.error(`Missing required fields for blog "${blog.title}"`);
                            } else if (!hasValidContent) {
                                toast.error(`Invalid content structure for blog "${blog.title}"`);
                            }
                        }
                        return isValid;
                    });

                    setImportedBlogs(validBlogs);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error parsing Excel file:', error);
                    toast.error('Failed to parse Excel file');
                    setIsLoading(false);
                }
            };
            reader.readAsArrayBuffer(file);
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

    const handleConfirmImport = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            importBlogs(formData)
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    setImportedBlogs([]);
                    setSelectedFile(null);
                })
                .catch((err) => {
                    toast.error(`Failed to import blogs: ${err.data?.message || 'Unknown error'}`);
                });
        } else {
            toast.error('Please select a file to import');
        }
    };

    const handleDownloadTemplate = () => {
        const templateUrl = 'https://res.cloudinary.com/dj8tkuzxz/raw/upload/blog-import-template.xlsx';
        const link = document.createElement('a');
        link.href = templateUrl;
        link.download = 'blog-import-template.xlsx';
        link.click();
    };

    const handleToggleRow = (blogId: string) => {
        setExpandedRows((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
    };

    return (
        <Box sx={{ width: '100%', mt: 4, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Import Blogs
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<GetApp />}
                    onClick={handleDownloadTemplate}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'dark.500',
                        bgcolor: 'primary.500',
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
                    Download Template
                </Button>
            </Box>

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
                        bgcolor: isDragging ? 'grey.100' : 'transparent',
                        transition: 'background-color 0.2s ease',
                        position: 'relative',
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileChange}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <CloudUpload sx={{ fontSize: 48, color: 'grey.500', mb: 2 }} />
                            <Typography variant="body1" sx={{ color: 'grey.600', mb: 1 }}>
                                Drag & Drop Excel files (.xlsx, .xls) here
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'grey.500', mb: 2 }}>
                                or
                            </Typography>
                            <Button
                                component="label"
                                variant="contained"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'dark.500',
                                    bgcolor: 'primary.500',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                                    border: '1px solid #F0F1F2',
                                    borderRadius: '8px',
                                    padding: '4px 16px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            >
                                Browse Files
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </>
                    )}
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            onClick={handleConfirmImport}
                            variant="contained"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'dark.500',
                                bgcolor: 'primary.500',
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
                            Confirm Import
                        </Button>
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                        <Table sx={{ tableLayout: 'fixed' }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 600, width: '50px' }}></TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600, flex: 1 }}>Title</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Author</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Label</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Created At</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {importedBlogs.map((blog) => (
                                    <React.Fragment key={blog.id}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton onClick={() => handleToggleRow(blog.id)}>
                                                    {expandedRows[blog.id] ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ width: 'fit-content' }}>{blog.id}</TableCell>
                                            <TableCell sx={{ flex: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar src={blog.image || ''} alt={blog.title} sx={{ width: 32, height: 32 }} />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                    >
                                                        {blog.title}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ width: 'fit-content' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar src={blog.author.avatar || ''} alt={blog.author.name} sx={{ width: 32, height: 32 }} />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                    >
                                                        {blog.author.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ width: 'fit-content' }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {blog.label}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: 'fit-content' }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
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
                                                    <Typography variant="body2">{blog.isPinned ? 'Pinned' : 'Normal'}</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={7} sx={{ p: 0 }}>
                                                <Collapse in={expandedRows[blog.id]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ p: 2, bgcolor: '#fafafa' }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                            Description
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                                            {blog.description}
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                            Intro
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                                            {blog.content[0].intro}
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                            Sections
                                                        </Typography>
                                                        {blog.content[0].sections.map((section, index) => (
                                                            <Box key={index} sx={{ mb: 2, pl: 2 }}>
                                                                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                                                    {section.title}
                                                                </Typography>
                                                                {section.paragraphs.length > 0 && (
                                                                    <>
                                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                            Paragraphs:
                                                                        </Typography>
                                                                        {section.paragraphs.map((para, i) => (
                                                                            <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                                                                                - {para}
                                                                            </Typography>
                                                                        ))}
                                                                    </>
                                                                )}
                                                                {section.listItems.length > 0 && (
                                                                    <>
                                                                        <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
                                                                            List Items:
                                                                        </Typography>
                                                                        {section.listItems.map((item, i) => (
                                                                            <Typography
                                                                                key={i}
                                                                                variant="body2"
                                                                                sx={{ ml: 2 }}
                                                                                dangerouslySetInnerHTML={{ __html: item }}
                                                                            />
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
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