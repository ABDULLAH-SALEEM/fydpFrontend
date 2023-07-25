
import SvgColor from '../components/svg-color';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import RvHookupIcon from '@mui/icons-material/RvHookup';

export const stringToArray = (string) => string.split(' ');

export const getRoleIcon = (role) => {
  if (role === 'Seller') {
    return <StorefrontIcon fontSize='small' color='white' />;
  } else if (role === 'Purchaser') {
    return <LocalMallIcon fontSize='small' color='white'  />;
  } else if (role === 'Supplier') {
    return <InventoryIcon fontSize='small' color='white' />;
  } else if (role === 'Distributer') {
    return <RvHookupIcon fontSize='small' color='white' />;
  }
};
