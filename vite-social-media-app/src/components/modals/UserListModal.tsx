import useUserListModal from '../../hooks/useUserListModal'
import Box from '../Box'


export default function UserListModal() {
  const { isOpen, Close } = useUserListModal()
  
  if(!isOpen) return null

  //TODO: handle ids data fetching
  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
