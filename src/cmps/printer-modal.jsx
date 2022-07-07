import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { SOCKET_EVENT_USER_UPDATED } from '../services/socket.service';

export const PrinterModal = ({ toggleModal, modal, user, order, getTime, zoneName }) => {
   const { t, i18n } = useTranslation();

   const [printedTo, setPrintedTo] = useState([])

   useEffect(() => {
      var printers = [...printedTo]
      user.activePrinters.map((printer) => {
         console.log('printer:', printer)
         if (printer.isSelected) {
            printers.push(printer.customName)
         }
      })
      setPrintedTo(printers)
      console.log('printedTo:', printedTo)

   }, [])



   return (
      <>
         {modal && (
            <div className="modal">
               <div onClick={toggleModal} className="overlay"></div>
               <div className="modal-content">
                  <h2>{t('Printing order')}</h2>
                  <h3 className="package-id">
                  {t('Package id')}: {order.packageId}
                  </h3>
                  <h3>
                     {t('Restaurant')}: {order.restaurantName}
                  </h3>
                  <h3>
                     {t('Customer')}: {order.customerName}
                  </h3>
                  <h3>
                     {t('Company')}: {order.company}
                  </h3>
                  <h3>
                     {(zoneName) && <>
                        {t('Address')}: {order.address} <span> {zoneName} </span>
                        <br />
                     </>}
                  </h3>
                  <h3>
                     {t('Address comments')}: {order.addressComments}
                  </h3>
                  <h3>
                     {t('Estimate delivery')}: {getTime(order.estSupply)}
                  </h3>
                  <h3>
                     {t('Source')}: {order.source}
                  </h3>
                  <h3>
                     {t('Total price')}: {order.price}
                  </h3>
                  <h3>
                     {t('Created at')}: {getTime(order.createdAt)}
                  </h3>
                  <h3>
                     {t('Dishes')}: {order.dishes}
                  </h3>
                  <h2>
                     {t('To printer')}:
                  </h2>
                  <h2>
                     {printedTo.join(' , \n')}.
                  </h2>
                  <button className="close-modal" onClick={toggleModal}>
                     x
                  </button>
               </div>
            </div>
         )}
      </>
   )
}