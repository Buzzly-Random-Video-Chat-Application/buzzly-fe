import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import Cookies from 'js-cookie';
import { loginSuccess } from '../stores/slices/userSlice';
import { IAuthResponse } from '../types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        baseUrl: AUTH_ENDPOINT,
    }),
    endpoints: (builder) => ({
        register: builder.mutation<IAuthResponse, { email: string; password: string; name: string }>({
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
        login: builder.mutation<IAuthResponse, { email: string, password: string}>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                data: {
                    email,
                    password,
                },
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                await queryFulfilled.then(({ data }) => {
                    const accessToken = data.tokens.access.token;
                    const refreshToken = data.tokens.refresh.token;

                    Cookies.set('accessToken', accessToken);
                    Cookies.set('refreshToken', refreshToken);

                    Cookies.set('user', JSON.stringify(data.result));
                    dispatch(loginSuccess(data.result));
                }).catch((error) => {
                    console.error('Error during login:', error);
                });
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
