import { Box, Typography, Divider } from '@mui/material';
import { icons } from '@assets/index';
import Button from '@components/ui/Button';
import { Google, Apple, ArrowBackRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';

interface BlogDetailProps {
    blog: IBlog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <Box sx={{ margin: '0 auto', padding: { xs: '20px', md: '40px' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
                <Button
                    icon={<ArrowBackRounded />}
                    category="text"
                    size="medium"
                    shape="pill"
                    width="auto"
                    onClick={handleBack}
                >
                    Back
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
                <Typography variant="body1" sx={{ color: 'dark.500' }}>
                    {blog.label}
                </Typography>
                <Divider orientation="vertical" sx={{ height: '24px', mx: 2 }} />
                <Typography variant="body1" sx={{ color: 'dark.500' }}>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 700, mb: { xs: 2, md: 4 }, textAlign: 'left' }}>
                {blog.title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, md: 4 }, textAlign: 'left' }}>
                {blog.description}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: { xs: 4, md: 8 } }}>
                <Button
                    category="primary"
                    size={isBrowser ? 'medium' : 'small'}
                    shape="pill"
                    width="auto"
                    onClick={() => navigate('/video-chat')}
                >
                    Start Video Chat
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                <Box sx={{ flex: 2 }}>
                    <img
                        src={blog.image}
                        alt="Main illustration"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Typography variant="body2" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                        {blog.image_title}
                    </Typography>
                </Box>
            </Box>

            {blog.content?.map((content, contentIndex) => {
                return (
                    <Box key={contentIndex} sx={{ mb: 4 }}>
                        {/* Nội dung intro */}
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {content?.intro}
                        </Typography>

                        {/* Các section */}
                        {content?.sections?.map((section, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Typography variant="h3" sx={{ fontWeight: 600, mb: { xs: 2, md: 4 } }}>
                                    {section.title}
                                </Typography>
                                {section.paragraphs.map((paragraph, pIndex) => (
                                    <Typography key={pIndex} variant="body1" sx={{ mb: { xs: 2, md: 4 } }}>
                                        {paragraph}
                                    </Typography>
                                ))}
                                {section.listItems && (
                                    <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                                        {section.listItems.map((item, iIndex) => (
                                            <li key={iIndex}>
                                                <Typography
                                                    variant="body1"
                                                    dangerouslySetInnerHTML={{ __html: item }}
                                                />
                                            </li>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                )
            })}

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button icon={<Apple />} category="default" size="small" shape="pill" width="auto">
                    App Store
                </Button>
                <Button icon={<Google />} category="default" size="small" shape="pill" width="auto">
                    Google Play
                </Button>
                <Button
                    icon={<img src={icons.logo} alt="Buzzly" style={{ width: '24px', height: '24px' }} />}
                    category="default"
                    size="small"
                    shape="pill"
                    width="auto"
                >
                    Buzzly Web
                </Button>
            </Box>
        </Box>
    );
};

export default BlogDetail;