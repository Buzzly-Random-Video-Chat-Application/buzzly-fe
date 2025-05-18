import { Box } from '@mui/material';
import AdminTopBar from '../../../components/AdminTopBar';
import BlogTable from './components/BlogTable';
import BlogAction from './components/BlogAction';
import { useGetBlogsQuery } from '@apis/blogApi';
import { useState } from 'react';
import BlogListAction from './components/BlogListAction';

const BlogsManagement = () => {
    const { data: blogs } = useGetBlogsQuery({});
    const [activeTab, setActiveTab] = useState('TABLE');
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                minHeight: '100vh',
                padding: '2rem 1rem',
            }}
        >
            {activeTab === 'TABLE' && (
                <>
                    <AdminTopBar />
                    <BlogTable
                        blogs={blogs?.results}
                        setActiveTabProp={setActiveTab}
                        setSelectedBlogProp={setSelectedBlog}
                    />
                </>
            )}
            {activeTab === 'ADD' && (
                <>
                    <AdminTopBar title="Add New Blog" setActiveTab={setActiveTab} />
                    <BlogAction action="add" setActiveTab={setActiveTab} />
                </>
            )}
            {activeTab === 'ADD_BY_CSV' && (
                <>
                    <AdminTopBar title="Add Blogs by CSV" setActiveTab={setActiveTab} />
                    <BlogListAction />
                </>
            )}
            {activeTab === 'EDIT' && selectedBlog && (
                <>
                    <AdminTopBar title="Edit Blog" setActiveTab={setActiveTab} />
                    <BlogAction action="edit" blog={selectedBlog} setActiveTab={setActiveTab} />
                </>
            )}
            {activeTab === 'VIEW' && selectedBlog && (
                <>
                    <AdminTopBar title="Blog Details" setActiveTab={setActiveTab} />
                    <BlogAction action="view" blog={selectedBlog} setActiveTab={setActiveTab} />
                </>
            )}
        </Box>
    );
};

export default BlogsManagement;