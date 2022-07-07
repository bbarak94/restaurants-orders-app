import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next';

import { removeOrder, setOrder } from "../store/actions/order.action"
import { useEffect, useState } from "react";
export const OrderPreview = ({ user, setIsEdit, order }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()
   const [zoneName, setZoneName] = useState('')
   useEffect(() => {
      getZone()
   }, [])

   const getZone = (ev) => {
      user.zones.map((zone, idx) => {
         zone.streets.map((street, sIdx) => {
            if (order.address.includes(zone.city) && order.address.includes(street)) setZoneName(zone.name)
         })
      })

   }

   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      // let second = time.getSeconds();
      // second = ('0' + second).slice(-2);
      return `${hour}:${minute}`
      // return `${hour}:${minute}:${second}`
   }

   if (document.body.dir === 'ltr') {
      var price = (+order.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
   } else {
      var price = (+order.totalPrice).toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
   }

   return (
      <>
         <td className="package-id">
            {order.packageId}
         </td>
         <td>
            {order.restaurantName}
         </td>
         <td>
            {order.customerName}
         </td>
         <td>
            {order.company}
         </td>
         <td>
            {(zoneName) && <>
               <span>{zoneName}</span>
               <br />
            </>}
            {order.address}
         </td>
         <td>
            {getTime(order.estSupply)}
         </td>
         <td>
            {order.source}
         </td>
         <td>
            {price}
         </td>
         {/* <td>
            {order.totalPrice}
         </td> */}
         <td>
            {getTime(order.createdAt)}
         </td>
         <td>
            {order.dishes}
         </td>
         {/* <td>
            {order.dishes.map((dish, idx) => {
               return (
                  <p key={idx}>{dish}</p>
               )
            }
            )}
         </td> */}
         <td>
            {t(`${order.status}`)}
         </td>
         <td>
            <button onClick={async () => {
               await dispatch(setOrder(order._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            <button>{t('Print')}</button>
            <button onClick={() => {
               dispatch(removeOrder(order._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}