import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import '@mantine/core/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './App/store.ts';
import { Provider } from 'react-redux';
import { createTheme, MantineProvider, rem } from '@mantine/core';
import NotificationWrapper from './App/features/Notifications/NotificationWrapper.tsx';

const theme = createTheme({
  colors: {
    blue: [
      '#faf2ef',
      '#efe3de',
      '#e2c4b8',
      '#d5a38e',
      '#cb876b',
      '#c57453',
      '#c26b48',
      '#ac5b39',
      '#995031',
      '#864327',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="698624114614-gja8hv8pe82c6gkgak4po4fb3jdu17r4.apps.googleusercontent.com">
      <MantineProvider theme={theme}>
        <NotificationWrapper>
          <App />
        </NotificationWrapper>
      </MantineProvider>
    </GoogleOAuthProvider>
  </Provider>,
);
