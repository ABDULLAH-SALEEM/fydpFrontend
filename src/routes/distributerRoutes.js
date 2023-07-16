import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
// import FeedbackPage from '../pages/FeedbackPage';
import Page404 from '../pages/Page404';
import DistributerDashboard from 'src/pages/Distributer/Dashboard';
import DistributerShipments from 'src/pages/Distributer/Shipment';

// ----------------------------------------------------------------------

export default function DistributerRouter() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DistributerDashboard /> },
        { path: 'shipments', element: <DistributerShipments /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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
