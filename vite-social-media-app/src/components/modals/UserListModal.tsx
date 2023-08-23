import { User } from '../../../typings'
import useUserListModal from '../../hooks/useUserListModal'
import ProfileListItem from '../ProfileListItem'
import Box from '../ui/Box'


export default function UserListModal() {
  const { isOpen, Close, users } = useUserListModal()
  
  if(!isOpen) return null

  
  //TODO: handle ids data fetching
  return (
    <Box
      onClick={Close}
    >
      {
        users?.map((user:User) => (
          <ProfileListItem user={ user } key={user.id}/>
        ))
      }
    </Box>
  )
}
