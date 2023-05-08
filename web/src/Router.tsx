import { Routes, Route } from 'react-router-dom';

import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

export function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
