import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/actions/user.action'
import { useTranslation } from 'react-i18next';
import { AdminSettings } from './admin-settings'
import { ZoneEdit } from '../cmps/zone-edit.jsx'
import { ZoneList } from '../cmps/zone-list.jsx'
import { loadUsers } from '../store/actions/user.action'
import { useNavigate } from 'react-router-dom';

export const ZoneApp = () => {
   const { t, i18n } = useTranslation();

   const { user } = useSelector((storeState) => storeState.userModule)
   const [zones, setApi] = useState(user.zones)
   const navigation = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      if (!user) {
         navigation('/')
      }
   }, [])

   if (!user) return <section className='zones-app'>
      <h1 className='title'>{t('You need to login first')}</h1>
   </section>

   const onAdd = async (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      var newZones = [...zones]
      newZones.push(
         {
            name: '',
            city: '',
            streets: ['']
         }
      )
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))
   }

   const onRefreshZones = async () => {
      await dispatch(loadUsers())
   }

   return (
      <section className='zone-app'>
         <div className='zone-status flex column'>
            <div className='flex'>
               <button onClick={(ev) => onAdd(ev)}>{t('Add zone')}</button>
               <button onClick={() => { onRefreshZones() }}>{t('Refresh')}</button>
            </div>
            <h1 style={{ margin: 'auto 0' }}>{t('Total zones')}: {zones.length}</h1>
         </div>
         {zones.length && (<ZoneList user={user} zones={user.zones} />)}
      </section>
   )
}