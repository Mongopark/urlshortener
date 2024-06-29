import { useRoutes, Navigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import NotFound from '../components/NotFound';
import AuthScreen from '../features/auth/AuthScreen';
import HomeScreen from '../features/transactions/HomeScreen';
import { useAppSelector } from '../hooks';

export default function Routes() {  
  const isUserAuthenticated = useAppSelector((state) => state.auth.isUserAuthenticated);
  

  const routes = useRoutes([
    {
      path: '/',
      element: !isUserAuthenticated ? <AuthScreen /> : <Navigate to="/home" replace />,
    },
    {
      path: '/home',
      element: isUserAuthenticated ? <HomeScreen /> : <Navigate to="/auth" replace />,
    },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
