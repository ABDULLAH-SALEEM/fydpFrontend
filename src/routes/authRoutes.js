import { Navigate, useRoutes } from 'react-router-dom';

import Page404 from '../pages/Page404';
import SimpleLayout from '../layouts/simple';
import SignInPage from 'src/pages/Common/SignIn';
import SignUpPage from 'src/pages/Common/Signup';
import VerifyOtpPage from 'src/pages/Common/verifyOtp';

// ----------------------------------------------------------------------

export default function AuthRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <SignInPage />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/verifyOtp',
      element: <VerifyOtpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
