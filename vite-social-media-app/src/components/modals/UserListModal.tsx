import { User } from '../../../typings'
import useUserListModal from '../../hooks/useUserListModal'
import ProfileListItem from '../ProfileListItem'
import Box from '../ui/Box'


export default function UserListModal() {
  const { isOpen, Close, users, action } = useUserListModal()
  
  if(!isOpen) return null

  
  //TODO: handle ids data fetching
  return (
    <Box
      onClick={Close}
    >
      {
        (users && users?.length > 0) ?
        users?.map((user:User) => (
          <ProfileListItem user={ user } key={user.id} action={action}/>
        )) :
        <p className='text-gray-400 font-semibold mt-5 ml-5'>No followers yet. Connect with others!</p>
      }
    </Box>
  )
}
