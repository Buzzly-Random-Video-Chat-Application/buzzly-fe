import { useState } from 'react';
import { Typography, Box, Rating, Checkbox, FormControlLabel, TextField } from '@mui/material';
import CustomDialog from './CustomDialog';
import { useReview } from '../hooks/review.hook';
import Button from './ui/Button';
import toast from 'react-hot-toast';

const ReviewDialog = () => {
    const { isReviewDialogOpen, closeReviewDialog, submitReview, isCreatingReview, isError } = useReview();
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

    const isSubmitDisabled = rating === 0 || review.trim() === '' || isCreatingReview;

    const handleSubmit = () => {
        if (isError) {
            toast.error('An error occurred while submitting your review. Please try again.');
            return;
        }
        if (!isSubmitDisabled) {
            submitReview(rating, review, dontShowAgain);
            setRating(0);
            setReview('');
            setDontShowAgain(false);
            toast.success('Thank you for your feedback!');

            setTimeout(() => {
                closeReviewDialog();
            }, 5000);
        }
    };

    const dialogContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h3">Give feedback</Typography>
            <Typography variant="body1">What do you think about buzzly?</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(_event, newValue) => setRating(newValue || 0)}
                    precision={0.5}
                    disabled={isCreatingReview}
                    sx={{
                        '& .MuiRating-icon': {
                            fontSize: { xs: '40px', sm: '50px' },
                        },
                        '& .MuiRating-iconFilled': {
                            color: 'primary.500',
                        },
                        '& .MuiRating-iconHover': {
                            color: 'primary.500',
                        },
                        '& .MuiRating-iconEmpty': {
                            color: 'gray.100',
                        },
                    }}
                />
            </Box>
            <Typography variant="body1">Do you have any thoughts you’d like to share?</Typography>
            <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Type your message here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                multiline
                rows={5}
                disabled={isCreatingReview}
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
                }}
            />
            <FormControlLabel
                control={<Checkbox checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} disabled={isCreatingReview} />}
                label="Don't show this dialog again"
                sx={{
                    userSelect: 'none',
                    '& .MuiTypography-root': {
                        fontSize: 16,
                        color: 'dark.500',
                    },
                    '& .MuiCheckbox-root': {
                        color: 'dark.500',
                        '&.Mui-checked': {
                            color: 'dark.500',
                        },
                    },
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button
                    onClick={handleSubmit}
                    category="primary"
                    shape="pill"
                    size="small"
                    width="70%"
                    disabled={isSubmitDisabled}
                >
                    {isCreatingReview ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                    onClick={closeReviewDialog}
                    category="default"
                    shape="pill"
                    size="small"
                    width="30%"
                    disabled={isCreatingReview}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );

    return (
        <CustomDialog
            open={isReviewDialogOpen}
            onClose={isCreatingReview ? () => { } : closeReviewDialog}
            maxWidth="sm"
            children={dialogContent}
        />
    );
};

export default ReviewDialog;