import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="698624114614-gja8hv8pe82c6gkgak4po4fb3jdu17r4.apps.googleusercontent.com">
    <MantineProvider>
      <App />
    </MantineProvider>
  </GoogleOAuthProvider>,
);
