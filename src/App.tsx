import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ReviewDialog from './components/ReviewDialog';
import Sidebar from './components/Sidebar';
import { useAppSelector } from './stores/store';
import { useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';

const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const userRole = user?.role;

  const location = useLocation();
  const isNotFoundPage = location.pathname === '*' || !Object.values(ROUTES).includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {!isNotFoundPage && (userRole === 'user' || !isAuthenticated) && <Header />}

      {isNotFoundPage ? (
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

      {!isNotFoundPage && (userRole === 'user' || !isAuthenticated) && <Footer />}

      <Chatbot />
      <ReviewDialog />
    </Box>
  );
};

export default App;