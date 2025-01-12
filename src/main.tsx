import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import store from './stores/store';
import React from 'react';
import App from './App';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <CssBaseline >
            <App />
          </CssBaseline>
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>,
);
