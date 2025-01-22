import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import Cookies from 'js-cookie';
import { loginSuccess } from '../stores/slices/userSlice';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        baseUrl: AUTH_ENDPOINT,
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ email, password, name }) => ({
                url: '/register',
                method: 'POST',
                data: {
                    email,
                    password,
                    name
                },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                data: {
                    email,
                    password,
                },
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    const { accessToken, refreshToken } = data;

                    Cookies.set('accessToken', accessToken);
                    Cookies.set('refreshToken', refreshToken);
                    const result = await dispatch(authApi.endpoints.me.initiate(undefined, { forceRefetch: true }));
                    Cookies.set('user', JSON.stringify(result.data));
                    dispatch(loginSuccess(result.data));
                } catch (error) {
                    console.error('Error during login:', error);
                }
            },
        }),
        me: builder.query({
            query: () => ({
                url: '/me',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
} = authApi;
