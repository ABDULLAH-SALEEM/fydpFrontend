// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const selerConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('analytics'),
  },

  {
    title: 'inquiries',
    path: '/dashboard/inquiries',
    icon: icon('inquiry'),
  },
  {
    title: 'Quotations',
    path: '/dashboard/quotations',
    icon: icon('quotation'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('order'),
  },
  {
    title: 'Suppliers',
    path: '/dashboard/supplier',
    icon: icon('supplier'),
  },
  {
    title: 'Distributer',
    path: '/dashboard/distributer',
    icon: icon('distributer'),
  },
];

export default selerConfig;
