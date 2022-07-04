import { userService } from "./user.service"
import { utilService } from './util.service.js'
import { httpService } from "./http.service"

const STORAGE_KEY_ORDERS = 'orders'

export const orderService = {
   query,
   getById,
   save,
   remove,
   getEmptyOrder,
   saveLocalOrders,
   getAllOrders
}


async function query(userId) {
   const orders =  await httpService.get(`order/byUser/${userId}`)
   saveLocalOrders(orders)
   return orders
}

async function getById(orderId) {
   const order = await httpService.get(`order/byOrder/${orderId}`)
   
   return order
}

async function remove(orderId) {
   return await httpService.delete(`order/${orderId}`)
}

async function save(order) {
   var savedOrder
   if (order._id) {
      savedOrder = await httpService.put(`order/`, order)
      // orderChannel.postMessage(getActionUpdateOrder(savedOrder))
   } else {
      savedOrder = await httpService.post(`order/`, order)
      // orderChannel.postMessage(getActionAddOrder(savedOrder))
   }
   return savedOrder
}


async function getEmptyOrder() {
   const user = await userService.getLoggedinUser()
   var now = new Date(Date.now())
   var est = new Date(Date.now())
   const newOrder = {
      restaurantName: user.fullname,
      restaurantId: user._id,
      packageId: utilService.makeNum(),
      customerName: '',
      company: '',
      address: '',
      estSupply: est.setMinutes(now.getMinutes() + 20),
      source: '',
      totalPrice: '',
      createdAt: now,
      dishes: [],
      status: 'Not printed'
   }
   return newOrder
}

function saveLocalOrders(orders) {
   sessionStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders))
   return orders
}

function getAllOrders() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_ORDERS)) || []
}