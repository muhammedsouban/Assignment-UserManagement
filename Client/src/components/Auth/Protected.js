import { useLocation, Navigate, Outlet } from 'react-router-dom';

function Auth() {
  const isAuth = localStorage.getItem("token");
  const location = useLocation();

    return (
        isAuth ? <Outlet />
        : <Navigate to='/' state={{ from: location }} replace />
    );
  }

export default Auth