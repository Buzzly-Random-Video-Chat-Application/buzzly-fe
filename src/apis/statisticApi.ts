import { createApi } from '@reduxjs/toolkit/query/react';
import { STATISTICS_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const statisticApi = createApi({
    reducerPath: 'statisticApi',
    baseQuery: axiosBaseQuery({
        baseUrl: STATISTICS_ENDPOINT,
    }),
    tagTypes: ['Statistic'],
    endpoints: (builder) => ({
        getUserStatistics: builder.query<IUserStatisticResponse, void>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['Statistic'],
        }),

        getConnectionStatistics: builder.query<IConnectionStatisticResponse, void>({
            query: () => ({
                url: '/connections',
                method: 'GET',
            }),
            providesTags: ['Statistic'],
        }),

        getWeeklyConnectionStatistics: builder.query<IWeeklyConnectionStatisticResponse, void>({
            query: () => ({
                url: '/connections/weekly',
                method: 'GET',
            }),
            providesTags: ['Statistic'],
        }),

        getReviewStatistics: builder.query<IReviewStatisticResponse, void>({
            query: () => ({
                url: '/reviews',
                method: 'GET',
            }),
            providesTags: ['Statistic'],
        }),

        getLivestreamStatistics: builder.query<ILivestreamStatisticResponse, void>({
            query: () => ({
                url: '/livestreams',
                method: 'GET',
            }),
            providesTags: ['Statistic'],
        }),
    }),
});

export const {
    useGetUserStatisticsQuery,
    useGetConnectionStatisticsQuery,
    useGetWeeklyConnectionStatisticsQuery,
    useGetReviewStatisticsQuery,
    useGetLivestreamStatisticsQuery,
} = statisticApi;