import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
// import FeedbackPage from '../pages/FeedbackPage';
import Page404 from '../pages/Page404';
import SellerDashboard from 'src/pages/Seller/Dashboard';
import SellerInquiries from 'src/pages/Seller/Enquiries';
import SellerQuotations from 'src/pages/Seller/Quotations';
import Products from 'src/pages/Seller/Products';
import SellerOrders from 'src/pages/Seller/Orders';
import SupplierList from 'src/pages/Seller/Supplier';
import DistributerList from 'src/pages/Seller/Distributers';

// ----------------------------------------------------------------------

export default function SelerRouter() {
 
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <SellerDashboard /> },
        { path: 'inquiries', element: <SellerInquiries /> },
        { path: 'quotations', element: <SellerQuotations /> },
        { path: 'products', element: <Products /> },
        { path: 'orders', element: <SellerOrders /> },
        { path: 'supplier', element: <SupplierList/> },
        { path: 'distributer', element: <DistributerList /> },
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
