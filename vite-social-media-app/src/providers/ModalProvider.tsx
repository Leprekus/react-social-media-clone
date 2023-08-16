import React from 'react'
import EditProfileModal from '../components/modals/EditProfileModal'
import PostModal from '../components/modals/PostModal'
import UserListModal from '../components/modals/UserListModal'
import CreatePostModal from '../components/modals/CreatePostModal'

export default function ModalProvider() {
  return (
    <>
        <UserListModal/>
        <CreatePostModal/>
        <EditProfileModal/>
        <PostModal/>
    </>
  )
}
