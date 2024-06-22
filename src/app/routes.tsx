import { useRoutes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop.tsx';
import NotFound from '../components/NotFound.tsx';
import AuthScreen from '../features/auth/AuthScreen.tsx';
import TransactionsScreen from '../features/transactions/TransactionsScreen.tsx';
import { useAppSelector } from '../hooks';

export default function Routes() {
  const isUserAuthenticated = useAppSelector((state) => state.isUserAuthenticated);


  const routes = useRoutes([
    {
      path: '/auth',
      element: isUserAuthenticated?<AuthScreen />:<TransactionsScreen/>
    },
    {
      path: '/home',
      element: isUserAuthenticated?<AuthScreen />:<TransactionsScreen/>
    },
    { path: '*', element: <NotFound /> }
  ]);

  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
