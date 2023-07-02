// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('analytics'),
  },

  // {
  //   title: 'faq',
  //   path: '/dashboard/faq',
  //   icon: icon('faq'),
  // },
  // {
  //   title: "Footer",
  //   path: '/dashboard/footer',
  //   icon: icon('footer'),
  // },
  // {
  //   title: "Home",
  //   path: '/dashboard/home',
  //   icon: icon('home'),
  // },
  // {
  //   title: "About",
  //   path: '/dashboard/about',
  //   icon: icon('about'),
  // },
  // {
  //   title: "Blog",
  //   path: '/dashboard/blog',
  //   icon: icon('blog'),
  // },
  // {
  //   title: "Chat",
  //   path: '/dashboard/chat',
  //   icon: icon('chat'),
  // },
];

export default navConfig;
