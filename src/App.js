import SelerRouter from './routes/selerRoutes';
import { useAuth } from './hooks/useAuth';
import AuthRouter from './routes/authRoutes';
import PurchaserRouter from './routes/purchaserRoutes';
import SupplierRouter from './routes/supplierRoutes';
import DistributerRouter from './routes/distributerRoutes';
// ----------------------------------------------------------------------

export default function App() {
  const { user } = useAuth();
  const getRoutes = () => {
    if (user?.role === 'Seller') {
      return <SelerRouter />;
    } else if (user?.role === 'Purchaser') {
      return <PurchaserRouter />;
    } else if (user?.role === 'Supplier') {
      return <SupplierRouter />;
    } else if (user?.role === 'Distributer') {
      return <DistributerRouter />;
    } else {
      return <AuthRouter />;
    }
  };
  return <>{getRoutes()}</>;
}
