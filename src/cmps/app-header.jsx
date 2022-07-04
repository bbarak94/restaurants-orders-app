import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserMsg } from './user-msg.jsx'
import { useNavigate } from 'react-router-dom'
import i18next from 'i18next'

import { userService } from '../services/user.service.js'
import routes from '../routes'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';

export const AppHeader = () => {
   const [lang, setLang] = useState('en')
   const navigation = useNavigate()
   const { t, i18n } = useTranslation();

   const onLogout = () => {
      userService.logout()
      navigation('/')
   }

   const onLogin = () => {
      navigation('/login')
   }
   const user = userService.getLoggedinUser()


   const handelLangChange = (ev) => {
      const selectedLang = ev.target.value
      i18next.changeLanguage(selectedLang)
      setLang(selectedLang)
      if (selectedLang === 'he') document.body.dir = 'RTL'
      else document.body.dir = 'LTR'
   }

   return (
      <header className="app-header">
         <UserMsg />
         <nav className='flex justify-center align-center'>
            {routes.map(route => <NavLink className='flex' key={route.path} to={route.path}>
                  {(route.label==='Home') && <HomeOutlinedIcon />}
                  {(route.label==='Orders') && <DeliveryDiningOutlinedIcon />}
                  {(route.label==='Printers') && <LocalPrintshopOutlinedIcon />}
                  {(route.label==='Zones') && <GpsFixedOutlinedIcon />}
                  {(route.label==='Settings') && <SettingsOutlinedIcon />}
                  {(route.label==='Login') && <VpnKeyTwoToneIcon />}
                  {(route.label==='Signup') && <FaceTwoToneIcon />}
                  
                  {t(route.label)}
            </NavLink>)}
            <select onChange={handelLangChange} className="lang-option" value={lang}>
               <option value="he">{t('langHe')}</option>
               <option value="en">{t('langEn')}</option>
            </select>
         </nav>
         {user && (<div className='welcome-msg flex align-center justify-center'>
            <h1 style={{ margin: '5px' }}>{t('Welcome')} {user.fullname}</h1>
            <button className='bad' onClick={() => onLogout()}>{t('Logout')}</button>
         </div>
         )
         }
         {!user && <div className='welcome-msg flex align-center justify-center'>
            <h1 style={{ margin: '5px' }}>{t('Welcome guest')}</h1>
            <button className='good' onClick={() => onLogin()}>{t('Login')}</button>
         </div>}
      </header>
   )
}
