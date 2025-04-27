import { Box } from '@mui/material';
import AdminTopBar from '../../../components/AdminTopBar';
import BlogsTable from './components/BlogsTable';
import BlogAction from './components/BlogAction';
import { useGetBlogsQuery } from '@apis/blogApi';
import { useState } from 'react';
import { IBlog } from '../../../types/blog';

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
                    <BlogsTable
                        blogs={blogs?.results}
                        setActiveTabProp={setActiveTab}
                        setSelectedBlogProp={setSelectedBlog}
                    />
                </>
            )}
            {activeTab === 'ADD' && (
                <>
                    <AdminTopBar title="Add New Blog" handleClick={() => setActiveTab('TABLE')} />
                    <BlogAction action="add" />
                </>
            )}
            {activeTab === 'ADD_BY_CSV' && (
                <>
                    <AdminTopBar title="Add Blogs by CSV" handleClick={() => setActiveTab('TABLE')} />
                    <div>Add by CSV</div>
                </>
            )}
            {activeTab === 'EDIT' && selectedBlog && (
                <>
                    <AdminTopBar title="Edit Blog" handleClick={() => setActiveTab('TABLE')} />
                    <BlogAction action="edit" blog={selectedBlog} />
                </>
            )}
            {activeTab === 'VIEW' && selectedBlog && (
                <>
                    <AdminTopBar title="Blog Details" handleClick={() => setActiveTab('TABLE')} />
                    <BlogAction action="view" blog={selectedBlog} />
                </>
            )}
        </Box>
    );
};

export default BlogsManagement;