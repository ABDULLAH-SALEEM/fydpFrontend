// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const distributerConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('analytics'),
  },

  {
    title: 'shipments',
    path: '/dashboard/shipments',
    icon: icon('shipment'),
  },
];

export default distributerConfig;
