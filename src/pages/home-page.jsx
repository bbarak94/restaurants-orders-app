import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



import { InsightsApp } from '../cmps/insights-app.jsx'
export function HomePage() {
      const { t, i18n } = useTranslation()
      const navigation = useNavigate()


      const [totalSales, setTotalSales] = useState(25534)
      const [totalOrders, setTotalOrders] = useState(984)
      const [totalClients, setTotalClients] = useState(65)
      const [dir, setDir] = useState(document.body.dir)

      const { user } = useSelector((storeState) => storeState.userModule)
      const { users } = useSelector((storeState) => storeState.userModule)
      const { orders } = useSelector((storeState) => storeState.orderModule)

      useEffect(() => {
            if (user) {
                  setTotalOrders(orders.length)
                  var sum = orders.reduce((acc, order) => {
                        return (+order.totalPrice) + acc
                  }, 0)
                  setTotalSales(sum)
                  setTotalOrders(orders.length)
            }
            if (users.length) {
                  setTotalClients(users.length)
            }

            if (orders.length) {
                  setTotalOrders(orders.length)
                  setTotalClients(orders.length)
            }

      }, [])

      const navLogin = () => {
            navigation('/login')
      }


      return (
            <section className='home-page flex column'>
                  <div className='main-text flex column align-center justify-center'>
                        <h1 className='title1'>{t('Smart management for delivery orders')}</h1>
                        <h2 className='title2'>{t('Beteabon is a decision support and management system for the delivery system in your restaurant,The system performs automation and customization for delivery orders')}</h2>
                        <button onClick={navLogin}>{t('Start Now')}</button>
                  </div>
                  <InsightsApp totalSales={totalSales} totalClients={totalClients} totalOrders={totalOrders}/>
            </section >
      )
}
