import { createContext, useContext } from 'react';

interface ReviewContextType {
    isReviewDialogOpen: boolean;
    openReviewDialog: () => void;
    closeReviewDialog: () => void;
    submitReview: (rating: number, review: string, dontShowAgain: boolean) => void;
    shouldShowReviewDialog: boolean;
    isCreatingReview: boolean;
    isError: boolean;
}

export const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};