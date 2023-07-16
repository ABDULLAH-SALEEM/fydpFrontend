import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
// import FeedbackPage from '../pages/FeedbackPage';
import Page404 from '../pages/Page404';
import PurchaserDashboard from 'src/pages/Purchaser/Dashboard';
import SellerList from 'src/pages/Purchaser/SellersList';
import Inquiry from 'src/pages/Purchaser/Inquiry';
import Orders from 'src/pages/Purchaser/Orders';
import PurchaserQuotations from 'src/pages/Purchaser/Quotation';

// ----------------------------------------------------------------------

export default function PurchaserRouter() {
 
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <PurchaserDashboard /> },
        { path: 'sellers', element: <SellerList /> },
        { path: 'inquiry', element: <Inquiry /> },
        { path: 'quotations', element: <PurchaserQuotations /> },
        { path: 'orders', element: <Orders /> },
        // { path: 'quotations', element: <SellerQuotations /> },
        // { path: 'feedback', element: <FeedbackPage /> },
        // { path: 'faq', element: <FaqPage /> },
        // { path: 'token', element: <TokenPage /> },
        // { path: 'package', element: <PackagePage /> },
        // { path: 'user', element: <UserPage /> },
        // { path: 'prompt', element: <PromptPage /> },
        // { path: 'footer', element: <FooterPage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'home', element: <HomePage /> },
        // { path: 'about', element: <AboutPage /> },
        // { path: 'chat', element: <ChatPage /> },
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
