import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Pagination,
} from '@mui/material';
import { AllInboxRounded, MailLockRounded, MarkEmailReadRounded, Search } from '@mui/icons-material';
import CustomTableHead, { CustomTableHeadItemProps } from '@components/TableHead';
import FeedbackCard from './FeedbackCard';

interface FeedbackCardSectionProps {
    feedbacks: IFeedback[] | undefined;
}

const FeedbackCardSection = ({ feedbacks = [] }: FeedbackCardSectionProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filterOptions: CustomTableHeadItemProps[] = [
        { icon: <AllInboxRounded />, title: 'All' },
        { icon: <MailLockRounded />, title: 'Processing' },
        { icon: <MarkEmailReadRounded />, title: 'Resolved' },
    ];
    const [selectedFilter, setSelectedFilter] = useState<CustomTableHeadItemProps>(filterOptions[0]);
    const [page, setPage] = useState(1);

    const rowsPerPage = 10;

    const filteredFeedbacks = feedbacks
        .filter((feedback) => {
            if (selectedFilter.title === 'All') return true;
            if (selectedFilter.title === 'Processing') return !feedback.isProcessed;
            if (selectedFilter.title === 'Resolved') return feedback.isProcessed;
            return false;
        })
        .filter((feedback) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                feedback.name.toLowerCase().includes(searchLower) ||
                feedback.email.toLowerCase().includes(searchLower) ||
                feedback.title.toLowerCase().includes(searchLower) ||
                feedback.message.toLowerCase().includes(searchLower)
            );
        });

    const totalPages = Math.ceil(filteredFeedbacks.length / rowsPerPage);
    const paginatedFeedbacks = filteredFeedbacks.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );
    console.log(paginatedFeedbacks);
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                gap: 2,
            }}>
                <CustomTableHead
                    items={filterOptions}
                    selected={selectedFilter}
                    setSelected={setSelectedFilter}
                />
                <TextField
                    placeholder="Search"
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
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2 }}>
                {paginatedFeedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
            </Box>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        siblingCount={1}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: '14px',
                            },
                            '& .Mui-selected': {
                                bgcolor: '#000',
                                color: '#fff',
                                '&:hover': { bgcolor: '#333' },
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FeedbackCardSection;