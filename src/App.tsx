import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
// import Chatbot from './components/Chatbot';
import ReviewDialog from './components/ReviewDialog';
import Sidebar from './components/Sidebar';
import { useAppSelector } from './stores/store';
import { useLocation, matchPath } from 'react-router-dom';
import { ROUTES } from './constants/routes';

const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const userRole = user?.role;

  const location = useLocation();

  const NOT_FOUND_PAGE = !Object.values(ROUTES).some(route => {
    const cleanRoute = typeof route === 'string' ? route.split('?')[0] : route;
    if (cleanRoute === location.pathname) return true;
    return matchPath({ path: cleanRoute }, location.pathname);
  });

  const BLOG_DETAILS_PAGE = matchPath({ path: ROUTES.BLOG_DETAILS }, location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {!NOT_FOUND_PAGE && (userRole === 'user' || !isAuthenticated) && !BLOG_DETAILS_PAGE && <Header />}
      {NOT_FOUND_PAGE ? (
        <Box sx={{ flex: 1, width: '100%' }}>
          <Routing />
        </Box>
      ) : (userRole === 'admin' && isAuthenticated) ? (
        <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
          <Sidebar />
          <Box sx={{ flex: 1 }}>
            <Routing />
          </Box>
        </Box>
      ) : (
        <Box sx={{ flex: 1, width: '100%' }}>
          <Routing />
        </Box>
      )}
      {!NOT_FOUND_PAGE && (userRole === 'user' || !isAuthenticated) && <Footer />}
      {/* <Chatbot /> */}
      <ReviewDialog />
    </Box>
  );
};

export default App;