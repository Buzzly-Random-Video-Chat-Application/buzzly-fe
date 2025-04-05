import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Home from '../pages/home';
import Register from '../pages/register';
import Login from '../pages/login';
import VideoChat from '../pages/video-chat';
import Live from '../pages/live';
import Blogs from '../pages/blogs';
import About from '../pages/about';
import Reviews from '../pages/reviews';
import BlogDetail from '../pages/blog';

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
      <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
      <Route path={ROUTES.VIDEO_CHAT} element={<VideoChat />} />
      <Route path={ROUTES.LIVE} element={<Live />} />
      <Route path={ROUTES.BLOGS} element={<Blogs />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.REVIEWS} element={<Reviews />} />
      <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetail />} />
    </Routes>
  );
};

export default Routing;
