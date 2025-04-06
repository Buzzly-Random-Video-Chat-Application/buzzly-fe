import { useParams } from 'react-router-dom';
import BlogDetailComponent from './components/BlogDetail';
import { blogs } from '../../../constants/app';
import { content1, content2, content3, content4, content5, content6, content7, content8, content9 } from '../../../constants/app';

const contents = [content1, content2, content3, content4, content5, content6, content7, content8, content9];

const BlogDetail = () => {
    const { label, title } = useParams<{ label: string; title: string }>();

    const blogIndex = blogs.findIndex(
        (blog) =>
            blog.label.toLowerCase().replace(/\s+/g, '-') === label &&
            blog.title.toLowerCase().replace(/\s+/g, '-') === title
    );

    const blog = blogs[blogIndex];
    const content = contents[blogIndex];

    return (
        <BlogDetailComponent
            topic={blog.label}
            title={blog.title}
            message={blog.description}
            image={blog.image}
            date={blog.date}
            content={content}
        />
    );
};

export default BlogDetail;