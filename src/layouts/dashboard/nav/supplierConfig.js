// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const  supplierConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('analytics'),
    },
  
    {
      title: 'Assignments',
      path: '/dashboard/assignments',
      icon: icon('assignment'),
    },

    {
        title: 'Products',
        path: '/dashboard/products',
        icon: icon('product'),
      },
   
  ];

  export default supplierConfig;