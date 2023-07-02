import SelerRouter from './routes/selerRoutes';
import { useAuth } from './hooks/useAuth';
import AuthRouter from './routes/authRoutes';
import PurchaserRouter from './routes/purchaserRoutes';
// ----------------------------------------------------------------------

export default function App() {
  const { user } = useAuth();
  const getRoutes = () => {
    if (user?.role === 'Seller') {
      return <SelerRouter />;
    } else if (user?.role === 'Purchaser') {
      return <PurchaserRouter />;
    } else {
      return <AuthRouter />;
    }
  };
  return <>{getRoutes()}</>;
}
