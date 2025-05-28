import { createApi } from '@reduxjs/toolkit/query/react';
import { LIVESTREAM_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const livestreamApi = createApi({
  reducerPath: 'livestreamApi',
  baseQuery: axiosBaseQuery({
    baseUrl: LIVESTREAM_ENDPOINT,
  }),
  tagTypes: ['Livestream'],
  endpoints: (builder) => ({
    createLivestream: builder.mutation<ILivestreamResponse, ILivestream>({
      query: (livestreamData) => ({
        url: '/',
        method: 'POST',
        data: livestreamData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Livestream'],
    }),

    getLivestreams: builder.query<ILivestreamListResponse, ILivestreamRequest>({
      query: ({ isLive, sortBy, limit, page }) => ({
        url: '/',
        method: 'GET',
        params: { isLive, sortBy, limit, page },
      }),
      providesTags: ['Livestream'],
    }),

    updateLivestream: builder.mutation<ILivestreamResponse, { livestreamId: string; livestreamData: ILivestream }>({
      query: ({ livestreamId, livestreamData }) => ({
        url: `/${livestreamId}`,
        method: 'PATCH',
        data: livestreamData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (_result, _error, { livestreamId }) => [{ type: 'Livestream', id: livestreamId }, 'Livestream'],
    }),

    deleteLivestream: builder.mutation({
      query: (livestreamId) => ({
        url: `/${livestreamId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Livestream'],
    }),

    getLivestream: builder.query<ILivestreamResponse, string>({
      query: (livestreamId) => ({
        url: `/${livestreamId}`,
        method: 'GET',
      }),
      providesTags: ['Livestream'],
    }),
  }),
});

export const {
  useCreateLivestreamMutation,
  useGetLivestreamsQuery,
  useUpdateLivestreamMutation,
  useDeleteLivestreamMutation,
  useGetLivestreamQuery,
} = livestreamApi;
