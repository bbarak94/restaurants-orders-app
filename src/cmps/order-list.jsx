
import { OrderPreview } from "./order-preview.jsx"
import { useTranslation } from 'react-i18next';
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { loadOrders } from "../store/actions/order.action.js";
import { useSelector } from "react-redux";

export const OrderList = ({ setIsEdit, orders }) => {
   const { t, i18n } = useTranslation();
   const { user } = useSelector((storeState) => storeState.userModule)

   useEffectUpdate(() => {
      loadOrders(user._id)
   }, [orders])

   return (
      <table className="order-list">
         <thead className="order-titles">
            <tr>
               <td>#</td>
               <td>{t('Restaurant')}</td>
               <td>{t('Customer')}</td>
               <td>{t('Company')}</td>
               <td>{t('Address')}</td>
               <td>{t('Estimate delivery')}</td>
               <td>{t('Source')}</td>
               <td>{t('Total price')}</td>
               <td>{t('Created at')}</td>
               <td>{t('Dishes')}</td>
               <td>{t('Status')}</td>
               <td>{t('Actions')}</td>
            </tr>
         </thead>
         <tbody >
            {orders.map((order, idx) => {
               return (
                  <tr key={idx}>
                     <OrderPreview setIsEdit={setIsEdit} order={order} />
                  </tr>
               )
            }
            )}
         </tbody>
      </table>
   )
}