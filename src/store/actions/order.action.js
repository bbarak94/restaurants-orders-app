import { orderService } from '../../services/order.service.js'


export function getActionSetOrders(orders) {
   return {
       type: 'SET_ORDERS',
       orders,
   }
}
export function getActionSetOrder(order) {
   return {
       type: 'SET_ORDER',
       order,
   }
}
export function getActionRemoveOrder(orderId) {
   return {
       type: 'REMOVE_ORDER',
       orderId,
   }
}
export function getActionAddOrder(order) {
   return {
       type: 'ADD_ORDER',
       order,
   }
}
export function getActionUpdateOrder(order) {
   return {
       type: 'UPDATE_ORDER',
       order,
   }
}


export function loadOrders(userId) {
   return async (dispatch) => {
       try {
           const orders = await orderService.query(userId)
           dispatch(getActionSetOrders(orders))
           return orders
       } catch {
           throw new Error('Could not load orders')
       }
   }
}

export function getOrder(orderId) {
   return async (dispatch) => {
       try {
           const order = await orderService.getById(orderId)
           dispatch(getActionSetOrder(order))
       } catch {
           throw new Error('Could not load orders')
       }
   }
}

export function removeOrder(orderId) {
   return async (dispatch) => {
       try {
           await orderService.remove(orderId)
           dispatch(getActionRemoveOrder(orderId))
       } catch {
           throw new Error('Could not remove order')
       }
   }
}

export function saveOrder(order) {
    return async (dispatch) => {
        const actionType = order._id ? 'UPDATE_ORDER' : 'ADD_ORDER'
        try {
            dispatch({ type: actionType, order })
            const savedOrder = await orderService.save(order)
            return savedOrder
        } catch (err) {
            console.log('Cannot save order', err)
        }
    }
}

export function setOrder(orderId) {
   return async (dispatch) => {
       try {
           const order = await orderService.getById(orderId)
           dispatch(getActionSetOrder(order))
       } catch (err) {
           console.log('Cannot set order', err)
       }
   }
}


