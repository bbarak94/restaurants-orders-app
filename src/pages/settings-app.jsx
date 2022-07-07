import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateUser } from '../store/actions/user.action'
import { useTranslation } from 'react-i18next';
import { AdminSettings } from './admin-settings'
import { userService } from '../services/user.service';

export const SettingsApp = () => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()
   const user = userService.getLoggedinUser()
   const [api, setApi] = useState(user?.API_KnEY)

   const navigation = useNavigate()
   useEffect(() => {
      if (!user) {
         navigation('/')
      }
   }, [])


   const onChangeApi = async (ev = null) => {
      if (!user) return
      ev.preventDefault()
      const newUser = { ...user }
      newUser.API_KEY = api
      await dispatch(updateUser(newUser))
   }

   const handleChange = (ev) => {
      const value = ev.target.value
      setApi(value)
   }



   if (!user) return <section className='settings-app'>
      <h1 className='title'>{t('Please login to see your settings')}</h1>
   </section>

   if (user.isAdmin) return (
      <AdminSettings />
   )



   return (
      <section className='settings-app flex align-center space-around'>
         <form className='settings-form flex column align-center' onSubmit={onChangeApi}>
            <h1 className='title'>{t('Welcome')} {user.fullname}</h1>
            <h2>{t('Your API-KEY is')}: </h2>
            <h4>{user.API_KEY}</h4>
            <h1 style={{ textAlign: 'center' }}>{t('Change API-KEY')}</h1>
            <input autoComplete='off' onChange={handleChange} autoFocus className='api-input'
               placeholder={t('Enter New API-KEY')} variant='filled' type='text' name='username' />
            <button onClick={onChangeApi} className='change-api-btn'>
               {t('Change API - Key')}
            </button>
         </form>
      </section>
   )

}