import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import { loadUsers, updateUser } from '../store/actions/user.action'


export const AdminSettings = () => {
   const { user } = useSelector((storeState) => storeState.userModule)
   const { users } = useSelector((storeState) => storeState.userModule)

   const [userId, setUserId] = useState(user._id)
   const [isEdit, setIsEdit] = useState(false)

   const [userToEdit, setUserToEdit] = useState(user)

   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()

   const handleChange = (ev) => {
      const value = ev.target?.value
      console.log('value:', value)
      setUserId(value)
   }

   const selectUser = (ev) => {
      ev.preventDefault()
      console.log('userId:', userId)
      const selected = users.find(u => u._id === userId)
      console.log('selected:', selected)
      setUserToEdit(selected)
      setIsEdit(true)
      console.log('userToEdit:', userToEdit)

   }

   const handleEditChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      console.log('field:',field)
      console.log('value:',value)
      
      const newUser = { ...userToEdit }
      switch (field) {
         case 'fullname':
            newUser.fullname = value
            break
         case 'username':
            newUser.username = value
            break
         case 'isAdmin':
            if (value==='false') newUser.isAdmin = false
            else newUser.isAdmin = true
            break
         case 'apiKey':
            newUser.API_KEY = value
            break
      }
      setUserToEdit(newUser)
   }

const saveUser = async(ev) =>{
   ev.preventDefault()
   console.log('saving user:', userToEdit)
   setIsEdit(false)
   await dispatch(updateUser(userToEdit))
   await dispatch(loadUsers())

}   

   return (
      <div className='settings-app flex align-center space-around'>
         <div className='admin-settings flex column align-center'>
            <h1>{t('Admin settings')}:</h1>
            <form onSubmit={selectUser}>
               <select onChange={handleChange} name='userId'>
                  {users.map((u, idx) => {
                     return <option key={idx} value={u._id}>{u.fullname}</option>
                  })}
               </select>
               <button onClick={() => selectUser}>{t('Select')}</button>
            </form>
            {isEdit &&
               <section className="admin-edit">
                  <button onClick={()=>{setIsEdit(false)}} className="esc-btn">x</button>
                  <form>
                     <input onChange={handleEditChange} autoFocus value={userToEdit.fullname} placeholder={t('Fullname')} type='text' name='fullname' />
                     <input onChange={handleEditChange} value={userToEdit.username} placeholder={t('Username')} type='text' name='username' />
                     <select onChange={handleEditChange} value={userToEdit.isAdmin} name='isAdmin'>
                        <option value={false}>Not admin</option>
                        <option value={true}>Admin</option>
                     </select>
                     <input onChange={handleEditChange} value={userToEdit.API_KEY} placeholder={t('Api key')} type='text' name='apiKey' />
                  <button onClick={saveUser}>Save</button>
                  </form>
               </section>
            }
         </div>
      </div >

   )
}
