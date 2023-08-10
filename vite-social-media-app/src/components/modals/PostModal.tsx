import usePostModal from '../../hooks/usePostModal'
import Box from '../Box'


export default function PostModal() {
  const { isOpen, Close } = usePostModal()
  
  if(!isOpen) return null

  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
