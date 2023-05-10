import { Routes, Route } from 'react-router-dom';

import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { Scheduling } from '../pages/Scheduling';
import { LoggedLayout } from '../layouts/LoggedLayout';
import { Unauthorized } from '../pages/Unathorized';
import { NotFound } from '../pages/NotFound';

export function Router() {
  return (
    <Routes>
      <Route element={<LoggedLayout adminOnly />}>
        <Route path="/appointments" element={<Scheduling />} />
      </Route>

      <Route element={<LoggedLayout />}>
        <Route path="/scheduling" element={<Scheduling />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
