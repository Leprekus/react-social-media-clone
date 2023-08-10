import React from 'react'
import FollowersModal from '../components/modals/FollowersModal'
import FollowingModal from '../components/modals/FollowingModal'
import EditProfileModal from '../components/modals/EditProfileModal'

export default function ModalProvider() {
  return (
    <>
        <FollowersModal/>
        <FollowingModal/>
        <EditProfileModal/>
    </>
  )
}
