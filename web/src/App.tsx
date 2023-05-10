import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Router } from './www/Router';
import { Container } from './layouts/Container';
import { AuthProvider } from './context/AuthProvider.tsx';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Container>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Router />
          </LocalizationProvider>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}
