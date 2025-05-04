import { FileUpload, ManageHistory, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react'
import ImportData from './ImportData';
import ImportDataHistory from './ImportDataHistory';

const BlogListAction = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('IMPORT')
    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
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
                        onClick={() => setActiveTab('IMPORT')}
                        startIcon={<FileUpload />}
                    >
                        Import Data
                    </Button>
                    <Button
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
                        onClick={() => setActiveTab('IMPORT_HISTORY')}
                        startIcon={<ManageHistory />}
                    >
                        Import Data History
                    </Button>
                </Box>
                <TextField
                    placeholder="Search blogs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        flex: 1,
                        maxWidth: { xs: '100%', md: 300 },
                        '& .MuiInputBase-root': {
                            padding: '10px 20px 10px 8px',
                            borderRadius: '8px',
                            fontSize: 16,
                        },
                        '& .MuiInputBase-input': {
                            padding: '2px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray.200',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray.400',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'dark.500',
                            borderWidth: 1,
                        },
                    }}
                />
            </Box>

            {activeTab === 'IMPORT' &&
                <ImportData />
            }

            {activeTab === 'IMPORT_HISTORY' &&
                <ImportDataHistory />
            }
        </Box>
    )
}

export default BlogListAction