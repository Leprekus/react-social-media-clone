import useFollowingModal from '../../hooks/useFollowingModal'
import Box from '../Box'


export default function FollowingModal() {
  const { isOpen, Close } = useFollowingModal()
  
  if(!isOpen) return null
  //TODO: handle following data fetching
  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
