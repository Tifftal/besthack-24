import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <App />
  </MantineProvider>
)
