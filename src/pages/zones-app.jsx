import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/actions/user.action'
import { useTranslation } from 'react-i18next';
import { AdminSettings } from './admin-settings.jsx'

export const ZonesApp = () => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()

   const { user } = useSelector((storeState) => storeState.userModule)
   const [zones, setApi] = useState(user.zones)
   if (!user) return <h1>{t('You need to login first')}</h1>

   const onChangeZones = async (ev = null) => {
      ev.preventDefault()
      const newUser = { ...user }
      newUser.zones = zones
      await dispatch(updateUser(newUser))
   }

   return (
   <h1>Zones app</h1>
   )
}