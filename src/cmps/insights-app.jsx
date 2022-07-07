

import { useTranslation } from 'react-i18next';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const InsightsApp = () => {

   const { t, i18n } = useTranslation()
   const [totalSales, setTotalSales] = useState(25534)
   const [totalOrders, setTotalOrders] = useState(984)
   const [totalClients, setTotalClients] = useState(65)
   const [dir, setDir] = useState(document.body.dir)

   const { user } = useSelector((storeState) => storeState.userModule)
   const { users } = useSelector((storeState) => storeState.userModule)
   const { orders } = useSelector((storeState) => storeState.orderModule)

   useEffect(() => {
      if (user) {
         setTotalOrders(orders.length)
         var sum = orders.reduce((acc, order) => {
            return (+order.totalPrice) + acc
         }, 0)
         setTotalSales(sum)
         setTotalOrders(orders.length)
      }
      if (users.length) {
         setTotalClients(users.length)
      }

      if (orders.length) {
         setTotalOrders(orders.length)
         setTotalClients(orders.length)
      }

   }, [])

   return (
      <div className='insights'>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Sales')}</h3>
                  <h1>{(document.body.dir === 'rtl') ?
                     totalSales.toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
                     :
                     totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  }
                  </h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center'>
               <AttachMoneyIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Orders')}</h3>
                  <h1>{totalOrders}</h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center orders'>
               <ReceiptLongIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Clients')}</h3>
                  <h1>{totalClients}</h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center restaurants'>
               <RestaurantIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div >
      </div >
   )
}