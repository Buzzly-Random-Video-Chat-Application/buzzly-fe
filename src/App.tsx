import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', position: 'relative' }}>
      <Navbar />
      <Routing />
      <Footer />
      <Chatbot />
    </Box>
  );
};

export default App;
