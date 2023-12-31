import ReactDOM from 'react-dom/client';
import './index.css';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes

// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider } from './context/snackbarContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <AuthProvider>
        <HelmetProvider>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </AuthProvider>
    </SnackbarProvider>
  </BrowserRouter>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
