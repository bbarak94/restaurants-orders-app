import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { PrinterList } from '../cmps/printer-list'
import { userService } from '../services/user.service'
import { printerService } from '../services/printer.service.js'

export const PrinterApp = () => {
   const { t, i18n } = useTranslation();
   const [printers, setprinters] = useState([])
   const [activeCount, setActiveCount] = useState(0)
   const user = userService.getLoggedinUser()

   useEffect(() => {
      if (!user || !user.API_KEY) return
      getActiveCount()
      printerService.query(user.API_KEY)
         .then(printers => {
            if (!printers) {
               setprinters(null)
               return
            } else {
               setprinters(printers)
            }
         })
   }, [])


   const onRefreshPrinters = async () => {
      printerService.query(user.API_KEY)
         .then(printers => {
            if (!printers) {
               setprinters(null)
               return
            } else {
               setprinters(printers)
            }
         })
      getActiveCount()
   }

   const getActiveCount = async () => {
      const selectedPrinters = user.activePrinters.filter(p => (p.isSelected))
      setActiveCount(selectedPrinters.length)
   }




   if (!user) return <h1>{t('Please login to see your printers')}</h1>
   else if (!user.API_KEY) return <h1>{t('Please check your API key')}</h1>
   else if (!printers) return <h1>{user.fullname} {t('have no printers yet, please check your API KEY')}</h1>
   else return (
      <section className='printer-app'>
         <div className='flex align-center' style={{ gap: '10px', marginBottom: '5px' }}>
            <button onClick={() => { onRefreshPrinters() }}>Refresh</button>
            <h1 style={{ margin: 'auto 0' }}>{t('Total printers')}: {printers.length}</h1>
            <h1 style={{ margin: 'auto 0' }}>{t('Selected printers')}: {activeCount}</h1>
         </div>
         {(printers.length) && <PrinterList onRefreshPrinters={onRefreshPrinters} printers={printers} user={user} />}
      </section>
   )

}