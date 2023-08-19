import EditProfileModal from '../components/modals/EditProfileModal'
import UserListModal from '../components/modals/UserListModal'
import ViewPostModal from '../components/modals/ViewPostModal'

export default function ModalProvider() {
  return (
    <>
        <ViewPostModal/>
        <UserListModal/>
        <EditProfileModal/>
    
    </>
  )
}
