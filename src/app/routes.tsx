import { useRoutes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop.tsx';
import NotFound from '../components/NotFound.tsx';
import AuthScreen from '../features/auth/AuthScreen.tsx';
import TransactionsScreen from '../features/transactions/TransactionsScreen.tsx';

export default function Routes() {
  const routes = useRoutes([
    {
      path: '/auth',
      element: <AuthScreen />
    },
    {
      path: '/home',
      element: <TransactionsScreen />
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
