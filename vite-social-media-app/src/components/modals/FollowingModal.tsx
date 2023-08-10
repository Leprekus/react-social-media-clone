import useFollowingModal from '../../hooks/useFollowingModal'
import Box from '../Box'


export default function FollowingModal() {
  const { isOpen, Close } = useFollowingModal()
  
  if(!isOpen) return null

  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
