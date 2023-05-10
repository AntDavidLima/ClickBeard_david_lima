import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '../../components/Header';

export function LoggedLayout({ adminOnly = false }) {
  const location = useLocation();

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && !user.admin) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
