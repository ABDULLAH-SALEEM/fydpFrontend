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
    icon: icon('faq'),
  },
  {
    title: 'Quotations',
    path: '/dashboard/quotations',
    icon: icon('footer'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: icon('footer'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('footer'),
  },
  {
    title: 'Suppliers',
    path: '/dashboard/supplier',
    icon: icon('footer'),
  },
  {
    title: 'Distributer',
    path: '/dashboard/distributer',
    icon: icon('footer'),
  },
];

export default selerConfig;
