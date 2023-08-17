import React from 'react'
import EditProfileModal from '../components/modals/EditProfileModal'
import UserListModal from '../components/modals/UserListModal'

export default function ModalProvider() {
  return (
    <>
        <UserListModal/>
        <EditProfileModal/>
    
    </>
  )
}
