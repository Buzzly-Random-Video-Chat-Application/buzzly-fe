import { useState, useEffect } from 'react';
import { ReviewContext } from '../hooks/review.hook';
import { RootState, useAppSelector } from '../stores/store';
import { useCreateReviewMutation } from '../apis/reviewApi';
import { useUpdateIsShowReviewMutation } from '../apis/userApi';
import { IReview } from '../types/review';

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [shouldShowReviewDialog, setShouldShowReviewDialog] = useState(false);

    const [createReview, { isLoading: isCreatingReview, error: createReviewError }] = useCreateReviewMutation();
    const [updateIsShowReview] = useUpdateIsShowReviewMutation();

    useEffect(() => {
        if (user && typeof user.isShowReview === 'boolean') {
            setShouldShowReviewDialog(user.isShowReview);
        } else {
            setShouldShowReviewDialog(false);
        }
    }, [user]);

    const openReviewDialog = () => {
        if (user && shouldShowReviewDialog) {
            setIsReviewDialogOpen(true);
        }
    };

    const closeReviewDialog = () => {
        setIsReviewDialogOpen(false);
    };

    const submitReview = async (rating: number, review: string, dontShowAgain: boolean) => {
        if (!user?.id) {
            console.error('No user ID available');
            return;
        }

        try {
            const reviewData: IReview = {
                userId: user.id,
                rating,
                review,
            };
            await createReview(reviewData).unwrap();
            console.log('Review submitted successfully');

            if (dontShowAgain) {
                await updateIsShowReview({ userId: user.id, isShowReview: false }).unwrap();
                setShouldShowReviewDialog(false);
                console.log('Updated isShowReview to false');
            }

            closeReviewDialog();
        } catch (error) {
            console.error('Error submitting review or updating preference:', error);
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                isReviewDialogOpen,
                openReviewDialog,
                closeReviewDialog,
                submitReview,
                shouldShowReviewDialog,
                isCreatingReview,
                isError: Boolean(createReviewError),
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};