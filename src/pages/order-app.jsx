import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { userService } from '../services/user.service'
import { orderService } from '../services/order.service'

import { OrderList } from '../cmps/order-list'
import { OrderEdit } from '../cmps/order-edit'
import { loadOrders } from '../store/actions/order.action'
export const OrderApp = () => {
   const { t, i18n } = useTranslation();
   const [isEdit, setIsEdit] = useState(false)
   const user = userService.getLoggedinUser()
   const { orders } = useSelector((storeState) => storeState.orderModule)
   const dispatch = useDispatch()
   useEffect(() => {
      if (!user) return
      dispatch(loadOrders(user._id))
   }, [])

   const onRefreshOrders = async () => {
      await dispatch(loadOrders(user._id))
   }

   if (!user) return (
      <h1>{t('Please login to see your orders')}</h1>
   )
   else if (!orders?.length) return (
      <section className='order-app'>
         <h1>{t('No orders')}</h1>
         <button onClick={() => setIsEdit(true)}>{t('Add an order')}</button>
         {(isEdit) && <OrderEdit setIsEdit={setIsEdit} />}
      </section>
   )
   else return (
      <section className='order-app'>
         <div className='flex align-center' style={{ gap: '10px', marginBottom: '5px' }}>
            <button onClick={() => { onRefreshOrders() }}>{t('Refresh')}</button>
            <button onClick={() => setIsEdit(true)}>{t('Add an order')}</button>
            <h1 style={{ margin: 'auto 0' }}>{t('Orders count')}: {orders.length}</h1>
         </div>
         {(isEdit) && <OrderEdit setIsEdit={setIsEdit} />}
         <div className='order-table'>
            <OrderList setIsEdit={setIsEdit} orders={orders} />
         </div>
      </section>
   )

}