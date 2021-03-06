import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { orderService } from "../services/order.service"
import { saveOrder, loadOrders, getActionSetOrder } from "../store/actions/order.action"

import Autocomplete from "react-google-autocomplete";

export const OrderEdit = ({ setIsEdit }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const { user } = useSelector((storeState) => storeState.userModule)
   var { order } = useSelector((storeState) => storeState.orderModule)

   const [newOrder, setNewOrder] = useState()
   const [_id, set_id] = useState(order?._id || '')
   const [customerName, setCustomerName] = useState(order?.customerName || '')
   const [company, setCompany] = useState(order?.company || '')
   const [address, setAddress] = useState(order?.address || '')
   const [addressComments, setAddressComments] = useState(order?.addressComments || '')
   const [createdAt, setCreatedAt] = useState(order?.createdAt || '')
   const [estSupply, setEstSupply] = useState(order?.estSupply || '')
   const [source, setSource] = useState(order?.source || '')
   const [totalPrice, setTotalPrice] = useState(order?.totalPrice || '')
   const [dishes, setDishes] = useState(order?.dishes || '')
   const [status, setStatus] = useState(order?.status || '')

   useEffect(() => {
      const getEmptyOrder = async () => {
         const emptyOrder = await orderService.getEmptyOrder()
         setNewOrder(emptyOrder)
         set_id(emptyOrder._id || '')
         setCustomerName(emptyOrder.customerName)
         setCompany(emptyOrder.company)
         setAddress(emptyOrder.address)
         setAddressComments(emptyOrder.addressComments)
         setCreatedAt(emptyOrder.createdAt)
         setEstSupply(emptyOrder.estSupply)
         setSource(emptyOrder.source)
         setTotalPrice(emptyOrder.totalPrice)
         setDishes(emptyOrder.dishes)
         setStatus(emptyOrder.status)
      }

      (!order) ? getEmptyOrder() : setNewOrder(order)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'customer':
            setCustomerName(value)
            break
         case 'company':
            setCompany(value)
            break
         case 'address':
            setAddress(value)
            break
         case 'addressComments':
            setAddressComments(value)
            break
         case 'estSupply':
            const newEstSupply = getTimeStamp(value)
            setEstSupply(newEstSupply)
            break
         case 'source':
            setSource(value)
            break
         case 'totalPrice':
            setTotalPrice(value)
            break
         case 'dishes':
            setDishes(value)
            break
         case 'status':
            setStatus(value)
            break
      }
   }

   const onSaveOrder = async (ev) => {
      ev.preventDefault()
      const orderToSave = {
         customerName,
         company,
         createdAt: Date.now(),
         dishes,
         address,
         addressComments,
         estSupply,
         restaurantName: newOrder.restaurantName,
         restaurantId: newOrder.restaurantId,
         packageId: newOrder.packageId,
         source,
         status,
         totalPrice,
      }

      if (newOrder) orderToSave['_id'] = newOrder._id
      await dispatch((saveOrder(orderToSave)))
      await dispatch(loadOrders(user._id))
      await dispatch(getActionSetOrder(null))
      setIsEdit(false)
   }

   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      const timeStr = `${hour}:${minute}:00`
      return timeStr
   }

   const getTimeStamp = (timeStr) => {
      var timeStamp = new Date(Date.now())
      timeStamp.setHours(timeStr.substring(0, 2))
      timeStamp.setMinutes(timeStr.substring(3, 5))
      timeStamp.setSeconds(timeStr.substring(6))
      return +timeStamp
   }

   if (!newOrder) return <h1>Loading...</h1>

   return (
      <div className="edit-order flex">

         <form className='order-edit-form flex' onSubmit={onSaveOrder}>
            <div className="flex column">
               <p>{t('Customer')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='order-input' value={customerName}
                  placeholder={t('Customer')} variant='filled' type='text' name='customer' />
            </div>
            <div className="flex column">
               <p>{t('Company')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={company}
                  placeholder={t('Company')} variant='filled' type='text' name='company' />
            </div>
            <div className="flex column">
               <p>{t('Address')} </p>
               <Autocomplete
                  placeholder={address}
                  apiKey={'AIzaSyABgO4oUpqijXboPo2k0niWE_RERjLtsN0'}
                  language="iw"
                  options={{
                     types: ["address"],
                     fields: ["formatted_address"],
                     componentRestrictions: { country: "il" },
                  }}
                  onPlaceSelected={(place) => {
                     setAddress(place.formatted_address)
                  }}
               />
            </div>
            <div className="flex column">
               <p>{t('Address comments')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={addressComments}
                  placeholder={t('Address comments')} variant='filled' type='text' name='addressComments' />
            </div>
            <div className="flex column">
               <p>{t('Estimate supply time')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={getTime(estSupply)}
                  placeholder={t('Estimate supply in minutes')} variant='filled' type='time' name='estSupply' />
            </div>
            <div className="flex column">
               <p>{t('Source')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={source}
                  placeholder={t('Source')} variant='filled' type='text' name='source' />
            </div>
            <div className="flex column">
               <p>{t('Total price')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={totalPrice}
                  placeholder={t('Total price')} variant='filled' type='number' min={0} name='totalPrice' />
            </div>
            <div className="flex column">
               <p>{t('Dishes')} </p>
               <input autoComplete='off' onChange={handleChange} className='order-input' value={dishes}
                  placeholder={t('Dishes')} variant='filled' type='text' name='dishes' />
            </div>
            <div className="flex column">
               <p>{t('Status')} </p>
               <select onChange={handleChange} value={status} name='status'>
                  <option value="Not printed">{t('Not printed')}</option>
                  <option value="Printed">{t('Printed')}</option>
               </select>
            </div>
            <button className="save" onClick={onSaveOrder}>{t('Save')}</button>
         </form>
         <button className="close-btn" onClick={async () => {
            await dispatch(getActionSetOrder(null))
            setIsEdit(false)
         }
         }
         >x</button>
      </div>)
}