import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '../../components/Header';

export function LoggedLayout() {
  const location = useLocation();

  return localStorage.getItem('token') ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}
