import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { orderService } from "../services/order.service"
import { saveOrder, loadOrders, setOrder } from "../store/actions/order.action"

import { userService } from "../services/user.service"

import Autocomplete from "react-google-autocomplete";




export const OrderEdit = ({ setIsEdit }) => {
   const [newOrder, setNewOrder] = useState()
   var { order } = useSelector((storeState) => storeState.orderModule)
   const [_id, set_id] = useState(order?._id || '')
   const [customerName, setCustomerName] = useState(order?.customerName || '')
   const [company, setCompany] = useState(order?.company || '')
   const [address, setAddress] = useState(order?.address || '')
   const [createdAt, setCreatedAt] = useState(order?.createdAt || '')
   const [estSupply, setEstSupply] = useState(order?.estSupply || '')
   const [source, setSource] = useState(order?.source || '')
   const [totalPrice, setTotalPrice] = useState(order?.totalPrice || '')
   const [dishes, setDishes] = useState(order?.dishes || '')
   const [status, setStatus] = useState(order?.status || '')

   const dispatch = useDispatch()
   const { user } = useSelector((storeState) => storeState.userModule)
   const { t, i18n } = useTranslation();

   useEffect(() => {
      const getEmptyOrder = async () => {
         const emptyOrder = await orderService.getEmptyOrder()
         setNewOrder(emptyOrder)
         set_id(emptyOrder._id||'')
         setCustomerName(emptyOrder.customerName)
         setCompany(emptyOrder.company)
         setAddress(emptyOrder.address)
         setCreatedAt(emptyOrder.createdAt)
         setEstSupply(emptyOrder.estSupply)
         setSource(emptyOrder.source)
         setTotalPrice(emptyOrder.totalPrice)
         setDishes(emptyOrder.dishes)
         setStatus(emptyOrder.status)
      };

      if (!order) {
         order = getEmptyOrder()
      } else {
         setNewOrder(order)
      }
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
         case 'estSupply':
            const newEstSupply = getTimeStamp(value)
            setEstSupply(newEstSupply)
            // setEstSupply(value)
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
         // _id,
         customerName,
         company,
         createdAt: Date.now(),
         dishes,
         address,
         estSupply,
         restaurantName: newOrder.restaurantName,
         restaurantId: newOrder.restaurantId,
         packageId: newOrder.packageId,
         source,
         status,
         totalPrice,
      }
      if(newOrder) orderToSave['_id'] = newOrder._id
      await dispatch((saveOrder(orderToSave)))
      await dispatch(loadOrders(user._id))
      // await dispatch(getActionSetOrder(null))
      setIsEdit(false)
   }

   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      // let second = time.getSeconds();
      // second = ('0' + second).slice(-2);
      const timeStr = `${hour}:${minute}:00`
      // const timeStr = `${hour}:${minute}:${second}`
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

   else return (
      <div className="edit-order" style={{ border: '2px black solid' }}>
         <button onClick={() => setIsEdit(false)}>x</button>
         <form className='order-edit-form flex' onSubmit={onSaveOrder}>
            <div className="flex column">
               <p>{t('Customer')} </p>
               <input onChange={handleChange} autoFocus className='order-input' value={customerName}
                  placeholder={t('Customer')} variant='filled' type='text' name='customer' />
            </div>
            <div className="flex column">
               <p>{t('Company')} </p>
               <input onChange={handleChange} className='order-input' value={company}
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
                     // console.log(place)
                     setAddress(place.formatted_address)
                  }}
               />
               {/* <input onChange={handleChange} className='order-input' value={address}
                  placeholder={t('Address')} variant='filled' type='text' name='address' /> */}
            </div>

            <div className="flex column">
               <p>{t('Estimate supply time')} </p>
               <input onChange={handleChange} className='order-input' value={getTime(estSupply)}
                  placeholder={t('Estimate supply in minutes')} variant='filled' type='time' name='estSupply' />

            </div>
            <div className="flex column">
               <p>{t('Source')} </p>
               <input onChange={handleChange} className='order-input' value={source}
                  placeholder={t('Source')} variant='filled' type='text' name='source' />
            </div>

            <div className="flex column">
               <p>{t('Total price')} </p>
               <input onChange={handleChange} className='order-input' value={totalPrice}
                  placeholder={t('Total price')} variant='filled' type='text' name='totalPrice' />
            </div>

            <div className="flex column">
               <p>{t('Dishes')} </p>
               <input onChange={handleChange} className='order-input' value={dishes}
                  placeholder={t('Dishes')} variant='filled' type='text' name='dishes' />
            </div>

            <div className="flex column">
               <p>{t('Status')} </p>
               <select onChange={handleChange} value={status} name='status'>
                  <option value="Not printed">{t('Not printed')}</option>
                  <option value="Printed">{t('Printed')}</option>
               </select>
               {/* <input onChange={handleChange} className='order-input' value={status}
                  placeholder={t('Status')} variant='filled' type='text' name='status' /> */}
            </div>


            <button className="save" onClick={onSaveOrder}>{t('Save')}</button>
         </form>

      </div>)
}