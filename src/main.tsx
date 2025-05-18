import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import store from './stores/store';
import React, { Suspense } from 'react';
import App from './App';
import './main.css';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import { ReviewProvider } from './providers/review.provider';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"
import { SocketProvider } from '@providers/socket.provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppThemeProvider>
          <BrowserRouter>
            <CssBaseline>
              <ReviewProvider>
                <SocketProvider>
                  <App />
                  <SpeedInsights />
                  <Analytics />
                </SocketProvider>
              </ReviewProvider>
            </CssBaseline>
          </BrowserRouter>
        </AppThemeProvider>
      </Suspense>
      <Toaster />
    </Provider>
  </React.StrictMode>
);