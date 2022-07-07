import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadOrders } from '../store/actions/order.action'
import { userService } from '../services/user.service'

import { InsightsApp } from '../cmps/insights-app'
import { OrderEdit } from '../cmps/order-edit'
import { OrderList } from '../cmps/order-list'

export const OrderApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const [isEdit, setIsEdit] = useState(false)

   const { orders } = useSelector((storeState) => storeState.orderModule)
   const user = userService.getLoggedinUser()

   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadOrders(user._id))
   }, [])

   const onRefreshOrders = async () => {
      await dispatch(loadOrders(user._id))
   }

   if (!user) return (
      <section className='order-app'>
         <h1 className='title'>{t('Please login to see your orders')}</h1>
      </section>
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
         <InsightsApp totalOrders={orders.length} totalClients={orders.length} totalSales={orders.length} />
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add an order')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Orders count')}: {orders.length}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshOrders() }}>{t('Refresh')}</button>
         </div>
         {(isEdit) && <OrderEdit setIsEdit={setIsEdit} />}
         <div className='order-table'>
            <OrderList setIsEdit={setIsEdit} orders={orders} />
         </div>
      </section>
   )

}