import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { updateSuccess } from '../stores/slices/userSlice';
import Cookies from 'js-cookie';
import { IUser } from '../types/user';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: USER_ENDPOINT,
    }),
    tagTypes: ['User'],  
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/',
                method: 'POST',
                data: userData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),

        getUsers: builder.query({
            query: ({ sortBy, limit, page }: { sortBy?: string; limit?: number; page?: number } = {}) => ({
                url: '/',
                method: 'GET',
                params: { sortBy, limit, page },
            }),
            providesTags: ['User'],
        }),
        
        getUserById: builder.query<IUser, string>({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),

        updateUser: builder.mutation({
            query: ({ userId, formData }) => ({
                url: `/${userId}`,
                method: 'PATCH',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                await queryFulfilled
                    .then(({ data }) => {
                        console.log('User updated:', data);
                        Cookies.set('user', JSON.stringify(data));
                        dispatch(updateSuccess(data));
                    })
                    .catch((error) => {
                        console.error('Error during user update:', error);
                    });
            },
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'User', id: userId }],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'], 
        }),
        updateIsShowReview: builder.mutation({
            query: ({ userId, isShowReview }) => ({
                url: `/${userId}/review`,
                method: 'PATCH',
                data: { isShowReview },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'User', id: userId }], 
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateIsShowReviewMutation,
} = userApi;