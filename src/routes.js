import { HomePage } from './pages/home-page.jsx'
import { OrderApp } from './pages/order-app.jsx'
import { PrinterApp } from './pages/printer-app.jsx'
import { ZonesApp } from './pages/zones-app.jsx'
import { SettingsApp } from './pages/settings-app.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const routes = [
   {
      path: '/',
      component: <HomePage />,
      label: 'Home',
   },
   {
      path: '/order',
      component:<OrderApp /> ,
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
