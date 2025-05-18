import { createApi } from '@reduxjs/toolkit/query/react';
import { REVIEW_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: axiosBaseQuery({
        baseUrl: REVIEW_ENDPOINT,
    }),
    tagTypes: ['Review'],  
    endpoints: (builder) => ({
        createReview: builder.mutation<IReviewResponse, IReview>({
            query: (reviewData) => ({
                url: '/',
                method: 'POST',
                data: reviewData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Review'], 
        }),

        getReviews: builder.query<IReviewListResponse, IReviewRequest>({
            query: ({  sortBy, limit, page }: {sortBy?: string; limit?: number; page?: number } = {}) => ({
                url: '/',
                method: 'GET',
                params: {  sortBy, limit, page },
            }),
            providesTags: ['Review'], 
        }),

        updateReview: builder.mutation<IReviewResponse, {reviewId: string, reviewData: IReviewUpdate}>({
            query: ({ reviewId, reviewData }) => ({
                url: `/${reviewId}`,
                method: 'PATCH',
                data: reviewData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (_result, _error, { reviewId }) => [
                { type: 'Review', id: reviewId }, 
                'Review', 
            ],
        }),

        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review'],
        }),

        getAppRating: builder.query<IAppRating, void>({
            query: () => ({
              url: '/app-rating',
              method: 'GET',
            }),
            providesTags: ['Review'],
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetAppRatingQuery,
} = reviewApi;