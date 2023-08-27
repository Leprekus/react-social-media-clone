import EditProfileModal from '../components/modals/EditProfileModal'
import SearchModal from '../components/modals/SearchModal'
import UserListModal from '../components/modals/UserListModal'
import ViewPostModal from '../components/modals/ViewPostModal'

export default function ModalProvider() {
  return (
    <>
        <SearchModal/>
        <ViewPostModal/>
        <UserListModal/>
        <EditProfileModal/>
    
    </>
  )
}
