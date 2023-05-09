import { Routes, Route } from 'react-router-dom';

import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Scheduling } from './pages/Scheduling';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/scheduling" element={<Scheduling />} />
      </Route>

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
