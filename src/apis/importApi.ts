import { createApi } from '@reduxjs/toolkit/query/react';
import { IMPORT_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const importApi = createApi({
    reducerPath: 'importApi',
    baseQuery: axiosBaseQuery({
        baseUrl: IMPORT_ENDPOINT,
    }),
    tagTypes: ['Import'],  
    endpoints: (builder) => ({
        getImports: builder.query<IImportListResponse, IImportRequest>({
            query: ({ sortBy, limit, page }: {sortBy?: string; limit?: number; page?: number } = {}) => ({
                url: '/',
                method: 'GET',
                params: { sortBy, limit, page },
            }),
            providesTags: ['Import'],
        }),
        getImport: builder.query<IImport, string>({
            query: (importId) => ({
                url: `/${importId}`,
                method: 'GET',
            }),
        }),
        deleteImport: builder.mutation<void, string>({
            query: (importId) => ({
                url: `/${importId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Import'],
        }),
    }),
});

export const { useGetImportsQuery, useGetImportQuery, useDeleteImportMutation } = importApi;