import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { updateUser } from '../store/actions/user.action';
import { useTranslation } from 'react-i18next'

export const StreetPreview = ({ idx,sIdx, user, zones, zone,  street }) => {
   const [streetName, setStreetName] = useState(street)
   const [isStreetEdit, setIsStreetEdit] = useState(false)
   const dispatch = useDispatch()

   const { t, i18n } = useTranslation();


   useEffect(() => {
      if (!streetName) setIsStreetEdit(true)
   }, [])

   const handleChange = (ev) => {
      const value = ev.target?.value
      setStreetName(value)
   }

   const onSave = async (ev) => {
      ev.stopPropagation()
      ev.preventDefault()
      if (!streetName) return
      var newZones = [...zones]
      var newZone = { ...zone }
      newZones[idx] = newZone
      newZone.streets[sIdx] = streetName
      setIsStreetEdit(false)
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))

   }
   return (<div className="street-preview flex align-center">
      {(!isStreetEdit) && (<div className="street-name-preview" onClick={() => { setIsStreetEdit(true) }}>
         <h3>{street}</h3>
      </div>)}
      {(isStreetEdit) && (<form className="street-name-edit flex align-center">
         <input autoComplete='off' onChange={handleChange} autoFocus value={streetName} placeholder={t('Street name')} type='text' name='street' />
         <button className="save-btn" onClick={(ev) => onSave(ev)}>{t('Save')}</button>
         <button className="close-btn" onClick={() => { 
            setIsStreetEdit(false)
            setStreetName(street)
             }}>x</button>
      </form>)}
      {/* <button>edit</button> */}
   </div>)
}