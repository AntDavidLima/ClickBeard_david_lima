import { Routes, Route } from 'react-router-dom';

import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { Scheduling } from '../pages/Scheduling';
import { LoggedLayout } from '../layouts/LoggedLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoggedLayout />}>
        <Route path="/scheduling" element={<Scheduling />} />
      </Route>

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
