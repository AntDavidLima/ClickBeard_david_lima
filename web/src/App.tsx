import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Router } from './Router';
import { Container } from './layouts/Container';

export function App() {
  return (
    <BrowserRouter>
      <Container>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Router />
        </LocalizationProvider>
      </Container>
    </BrowserRouter>
  );
}
