import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { updateSuccess } from '../stores/slices/userSlice';
import Cookies from 'js-cookie';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: USER_ENDPOINT,
    }),
    tagTypes: ['User'],  
    endpoints: (builder) => ({
        createUser: builder.mutation<IUserResponse, IUserCreate>({
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
        getUsers: builder.query<IUserListResponse, IUserRequest>({
            query: ({ sortBy, limit, page }: { sortBy?: string; limit?: number; page?: number } = {}) => ({
                url: '/',
                method: 'GET',
                params: { sortBy, limit, page },
            }),
            providesTags: ['User'],
        }),
        
        getUser: builder.query<IUserResponse, string>({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),

        updateUser: builder.mutation<IUserResponse, {userId: string, userData: IUserUpdate}>({
            query: ({ userId, userData }) => ({
                url: `/${userId}`,
                method: 'PATCH',
                data: userData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                await queryFulfilled
                    .then(({ data }) => {
                        Cookies.set('user', JSON.stringify(data.result));
                        dispatch(updateSuccess(data.result));
                    })
                    .catch((error) => {
                        console.error('Error during user update:', error);
                    });
            },
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'User', id: userId }],
        }),

        deleteUser: builder.mutation<void, string>({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'], 
        }),

        updateIsShowReview: builder.mutation<IUserResponse, { userId: string, isShowReview: boolean}>({
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

        updateUserAvatar: builder.mutation<IUserResponse, { userId: string, formData: FormData}>({
            query: ({ userId, formData }) => ({
                url: `/${userId}/avatar`,
                method: 'PATCH',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                await queryFulfilled
                    .then(({ data }) => {
                        Cookies.set('user', JSON.stringify(data.result));
                        dispatch(updateSuccess(data.result));
                    })
                    .catch((error) => {
                        console.error('Error during avatar update:', error);
                    });
            },
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'User', id: userId }],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateIsShowReviewMutation,
    useUpdateUserAvatarMutation,
} = userApi;