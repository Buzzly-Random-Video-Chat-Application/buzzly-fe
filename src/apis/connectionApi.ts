import { createApi } from '@reduxjs/toolkit/query/react';
import { CONNECTION_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';

export const connectionApi = createApi({
  reducerPath: 'connectionApi',
  baseQuery: axiosBaseQuery({
    baseUrl: CONNECTION_ENDPOINT,
  }),
  tagTypes: ['Connection'],
  endpoints: (builder) => ({
    createConnection: builder.mutation<IConnectionResponse, IConnection>({
      query: (connection) => ({
        url: '/',
        method: 'POST',
        body: connection,
      }),
    }),

    getConnections: builder.query<IConnectionListResponse, IConnectionRequest>({
      query: ({ sortBy, limit, page }) => ({
        url: '/',
        method: 'GET',
        params: { sortBy, limit, page },
      }),
    }),

    getConnection: builder.query<IConnectionResponse, string>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'GET',
      }),
    }),

    updateConnection: builder.mutation<IConnectionResponse, { roomId: string; connection: IConnection }>({
      query: ({ roomId, connection }) => ({
        url: `/${roomId}`,
        method: 'PATCH',
        body: connection,
      }),
    }),

    deleteConnection: builder.mutation<IConnectionResponse, string>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateConnectionMutation,
  useGetConnectionsQuery,
  useGetConnectionQuery,
  useUpdateConnectionMutation,
  useDeleteConnectionMutation,
} = connectionApi;