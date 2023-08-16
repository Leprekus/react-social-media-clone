import useUserListModal from '../../hooks/useUserListModal'
import Box from '../ui/Box'


export default function UserListModal() {
  const { isOpen, Close, ids } = useUserListModal()
  
  if(!isOpen) return null

  //TODO: handle ids data fetching
  return (
    <Box
      onClick={Close}
    >
      {
        ids?.map(id => (
          <ul>
            <li>{ id }</li>
          </ul>
        ))
      }
    </Box>
  )
}
