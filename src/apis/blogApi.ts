import { createApi } from '@reduxjs/toolkit/query/react';
import { BLOG_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { IBlogResponse, IBlogRequest, IBlogListResponse } from '../types/blog';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BLOG_ENDPOINT,
    }),
    tagTypes: ['Blog'],  
    endpoints: (builder) => ({
        createBlog: builder.mutation<IBlogResponse, FormData>({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['Blog'], 
        }),

        getBlogs: builder.query<IBlogListResponse, IBlogRequest>({
            query: ({ sortBy, limit, page }: {sortBy?: string; limit?: number; page?: number } = {}) => ({
                url: '/',
                method: 'GET',
                params: { sortBy, limit, page },
            }),
            providesTags: ['Blog'], 
        }),

        updateBlog: builder.mutation<IBlogResponse, { blogId: string, blogData: FormData}>({
            query: ({ blogId, blogData }) => ({
                url: `/${blogId}`,
                method: 'PUT',
                data: blogData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: (_result, _error, { blogId }) => [
                { type: 'Blog', id: blogId }, 
                'Blog', 
            ],
        }),

        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `/${blogId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),

        getBlog: builder.query<IBlogResponse, string>({
            query: (blogId) => ({
                url: `/${blogId}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, blogId) => [{ type: 'Blog', id: blogId }],
        })
    }),
});

export const {
    useCreateBlogMutation,
    useGetBlogsQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useGetBlogQuery,
} = blogApi;