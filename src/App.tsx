import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routing />
      <Footer />
    </Box>
  );
};

export default App;
