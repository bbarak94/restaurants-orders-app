import { HomePage } from './pages/home-page.jsx'
import { OrderApp } from './pages/order-app.jsx'
import { PrinterApp } from './pages/printer-app.jsx'
import { SettingsApp } from './pages/settings-app.jsx'

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
      path: '/settings',
      component: <SettingsApp />,
      label: 'Settings',
   }
]

export default routes;
