import { HomePage } from './pages/home-page'
import { OrderApp } from './pages/order-app'
import { PrinterApp } from './pages/printer-app'
import { ZonesApp } from './pages/zones-app'
import { SettingsApp } from './pages/settings-app'
import { LoginSignup } from './pages/login-signup'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const routes = [
   {
      path: '/',
      component: <HomePage />,
      label: 'Home',
   },
   {
      path: '/order',
      component: <OrderApp />,
      label: 'Orders',
   },
   {
      path: '/printer',
      component: <PrinterApp />,
      label: 'Printers',
   },
   {
      path: '/zones',
      component: <ZonesApp />,
      label: 'Zones',
   },
   {
      path: '/settings',
      component: <SettingsApp />,
      label: 'Settings',
   },
   {
      path: '/login',
      component: <LoginSignup isSignup={false} />,
      label: 'Login',
   },
   {
      path: '/signup',
      component: <LoginSignup isSignup={true} />,
      label: 'Signup',
   },
]

export default routes;
