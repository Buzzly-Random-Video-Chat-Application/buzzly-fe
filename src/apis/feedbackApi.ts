import { createApi } from '@reduxjs/toolkit/query/react';
import { FEEDBACK_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: axiosBaseQuery({
        baseUrl: FEEDBACK_ENDPOINT,
    }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        createFeedback: builder.mutation<IFeedbackResponse, IFeedbackRequest>({
            query: (feedbackData) => ({
                url: '/',
                method: 'POST',
                data: feedbackData,
            }),
            invalidatesTags: ['Feedback'],
        }),

        getFeedbacks: builder.query<IFeedbackListResponse, IFeedbackListRequest>({
            query: ({ isProcessed, sortBy, limit, page }) => ({
                url: '/',
                method: 'GET',
                params: { isProcessed, sortBy, limit, page },
            }),
            providesTags: ['Feedback'],
        }),

        deleteFeedback: builder.mutation({
            query: (feedbackId) => ({
                url: `/${feedbackId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Feedback'],
        }),

        updateFeedback: builder.mutation<IFeedbackResponse, IFeedbackUpdateRequest>({
            query: ({ feedbackId, isProcessed }) => ({
                url: `/${feedbackId}`,
                method: 'PUT',
                data: isProcessed,
            }),
            invalidatesTags: (_result, _error, { feedbackId }) => [
                { type: 'Feedback', id: feedbackId },
                'Feedback',
            ],
        }),

        getFeedback: builder.query<IFeedbackResponse, string>({
            query: (feedbackId) => ({
                url: `/${feedbackId}`,
                method: 'GET',
            }),
            providesTags: ['Feedback'],
        }),
    }),
});

export const {
    useCreateFeedbackMutation,
    useGetFeedbacksQuery,
    useDeleteFeedbackMutation,
    useUpdateFeedbackMutation,
    useGetFeedbackQuery,
} = feedbackApi;