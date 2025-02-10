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

    endpoints: (builder) => ({
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
                await queryFulfilled.then(({ data }) => {
                    console.log('User updated:', data);

                    Cookies.set('user', JSON.stringify(data));
                    dispatch(updateSuccess(data));
                }).catch((error) => {
                    console.error('Error during user update:', error);
                });
            },
        }),
    }),
});

export const {
    useUpdateUserMutation,
} = userApi;