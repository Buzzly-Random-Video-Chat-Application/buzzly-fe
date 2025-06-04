import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import ProtectedRoute from './ProtectedRoute';

import Home from '@pages/client/home';
import VideoChat from '@pages/client/video-chat';
import Live from '@pages/client/live';
import Blogs from '@pages/client/blogs';
import About from '@pages/client/about';
import Reviews from '@pages/client/reviews';
import BlogDetail from '@pages/client/blog';

import Dashboard from '@pages/admin/dashboard';
import BlogsManagement from '@pages/admin/blogs-management';
import UserManagement from '@pages/admin/users-management';
import FeedbacksManagament from '@pages/admin/reviews-management';
import AnnouncementsManagement from '@pages/admin/announcements-management';
import Settings from '@pages/admin/settings';

import Register from '@pages/auth/register';
import Login from '@pages/auth/login';
import ForgotPassword from '@pages/auth/forgot-password';
import ResetPassword from '@pages/auth/reset-password';
import VerifyEmail from '@pages/auth/verify-email';

import NotFoundPage from './NotFoundPage';
import LiveGuest from '@pages/client/live/guest';
import LiveHost from '@pages/client/live/host';
import LivestreamsManagement from '@pages/admin/livestreams-management';
import ConnectionsManagement from '@pages/admin/connections-management';

const Routing = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />

      {/* Public */}

      {/* Client */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.VIDEO_CHAT} element={<VideoChat />} />
      <Route path={ROUTES.LIVE} element={<Live />} />
      <Route path={ROUTES.LIVE_GUEST} element={<LiveGuest />} />
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path={ROUTES.LIVE_HOST} element={<LiveHost />} />
      </Route>
      <Route path={ROUTES.BLOGS} element={<Blogs />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.REVIEWS} element={<Reviews />} />
      <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetail />} />

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.BLOGS_MANAGEMENT} element={<BlogsManagement />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.USERS_MANAGEMENT} element={<UserManagement />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.REVIEWS_MANAGEMENT} element={<FeedbacksManagament />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.ANNOUNCEMENTS_MANAGEMENT} element={<AnnouncementsManagement />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.LIVESTREAMS_MANAGEMENT} element={<LivestreamsManagement />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path={ROUTES.CONNECTIONS_MANAGEMENT} element={<ConnectionsManagement />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
