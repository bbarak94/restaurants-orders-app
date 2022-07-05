import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserMsg } from './user-msg'
import { useNavigate } from 'react-router-dom'
import i18next from 'i18next'

import { userService } from '../services/user.service.js'
import routes from '../routes'

import logo from '../assets/img/logo.png'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

export const AppNavigation = () => {
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
      <div className="app-navigation">
         <aside>
            <UserMsg />
            {/* {!user && <div className='welcome-msg flex align-center justify-center'>
               <h3 style={{ margin: '5px' }}>{t('Welcome guest')}</h3>
               <button className='good' onClick={() => onLogin()}>{t('Login')}</button>
            </div>} */}
            <div className='sidebar'>
               <nav>
            <div className='top flex align-center space-between'>
               <div className='logo flex img-container' style={{ width: '120px', padding: '14px' }}>
                  <img src={logo} />
               </div>
               {/* <CloseIcon className='close-btn' /> */}
            </div>
                  {routes.map(route => <NavLink className='nav-link' key={route.path} to={route.path}>
                     <h3>
                        {(route.label === 'Home') && <span><HomeOutlinedIcon /></span>}
                        {(route.label === 'Orders') && <span><DeliveryDiningOutlinedIcon /></span>}
                        {(route.label === 'Printers') && <span><LocalPrintshopOutlinedIcon /></span>}
                        {(route.label === 'Zones') && <span><GpsFixedOutlinedIcon /></span>}
                        {(route.label === 'Settings') && <span><SettingsOutlinedIcon /></span>}
                        {(route.label === 'Login') && <span><VpnKeyTwoToneIcon /></span>}
                        {(route.label === 'Signup') && <span><FaceTwoToneIcon /></span>}
                        {t(route.label)}
                        {(route.label === 'Orders') && <span className='order-count'>26</span>}
                     </h3>
                  </NavLink>)}
                  <select onChange={handelLangChange} className="lang-option" value={lang}>
                     <option value="he">{t('langHe')}</option>
                     <option value="en">{t('langEn')}</option>
                  </select>
               </nav>
               {user && (
                  <h3 onClick={()=>onLogout()} className='logout-btn'>
                     {/* <h3 style={{ margin: '5px' }}>{t('Welcome')} {user.fullname}</h3> */}
                     <LogoutIcon />
                     {t('Logout')}
                  </h3>
               )}
            </div>
         </aside >
      </div >
   )
}
