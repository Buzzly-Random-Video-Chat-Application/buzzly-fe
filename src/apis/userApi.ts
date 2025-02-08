import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: USER_ENDPOINT,
    }),

    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({ userId, name, avatar }) => ({
                url: `/${userId}`,
                method: 'PATCH',
                data: {
                    name,
                    avatar
                },
            }),
        }),
    }),
});

export const {
    useUpdateUserMutation,
} = userApi;