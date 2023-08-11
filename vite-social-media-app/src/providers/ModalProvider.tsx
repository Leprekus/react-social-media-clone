import React from 'react'
import EditProfileModal from '../components/modals/EditProfileModal'
import PostModal from '../components/modals/PostModal'
import UserListModal from '../components/modals/UserListModal'

export default function ModalProvider() {
  return (
    <>
        <UserListModal/>
      
        <EditProfileModal/>
        <PostModal/>
    </>
  )
}
