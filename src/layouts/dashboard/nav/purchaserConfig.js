// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const  purchaserConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('analytics'),
    },
  
    {
      title: 'sellers',
      path: '/dashboard/sellers',
      icon: icon('faq'),
    },
    {
      title: 'Inquiries',
      path: '/dashboard/inquiry',
      icon: icon('faq'),
    },
    {
      title: 'Quotations',
      path: '/dashboard/quotations',
      icon: icon('faq'),
    },
    {
      title: 'Orders',
      path: '/dashboard/orders',
      icon: icon('faq'),
    },
  ];

  export default purchaserConfig;