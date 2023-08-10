import useFollowersModal from '../../hooks/useFollowersModal'
import Box from '../Box'


export default function FollowersModal() {
  const { isOpen, Close } = useFollowersModal()
  
  if(!isOpen) return null

  //TODO: handle followers data fetching
  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
