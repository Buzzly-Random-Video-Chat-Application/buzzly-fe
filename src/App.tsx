import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { useAppSelector } from './stores/store';

const App = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', position: 'relative' }}>
      <Navbar user={user} />
      <Routing />
      <Footer />
      <Chatbot />
    </Box>
  );
};

export default App;
