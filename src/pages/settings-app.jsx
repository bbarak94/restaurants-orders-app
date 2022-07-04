import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/actions/user.action'
import { useTranslation } from 'react-i18next';
import { AdminSettings } from './admin-settings.jsx'
import { userService } from '../services/user.service';

export const SettingsApp = () => {
   const { t, i18n } = useTranslation();

   const dispatch = useDispatch()
   const user = userService.getLoggedinUser()
   // const { user } = useSelector((storeState) => storeState.userModule)
   const [api, setApi] = useState(user?.API_KEY)
   const onChangeApi = async (ev = null) => {
      if(!user) return
      ev.preventDefault()
      const newUser = { ...user }
      newUser.API_KEY = api
      await dispatch(updateUser(newUser))
   }

   const handleChange = (ev) => {
      const value = ev.target.value
      setApi(value)
   }
   if (!user) return <h1>{t('Please login to see your settings')}</h1>
   if(user.isAdmin) return(
      <AdminSettings />
   )
   return (
      <div className='settings-app flex align-center space-around'>
         <div className='flex column align-center'>
            <h1>{t('Welcome')} {user.fullname}</h1>
            <h2>{t('Your API-KEY is')}: </h2>
            <h3>{user.API_KEY}</h3>
         </div>
         <div>
            <form className='settings-form flex column align-center' onSubmit={onChangeApi}>
               <h1 style={{ textAlign: 'center' }}>{t('Change API-KEY')}</h1>
               <input onChange={handleChange} autoFocus className='api-input'
                  placeholder={t('Enter New API-KEY')} variant='filled' type='text' name='username' />
               <button onClick={onChangeApi} className='change-api-btn'>
                  {t('Change API - Key')}
               </button>
            </form>
         </div>
      </div>
   )

}