import useCreatePostModal from '../../hooks/useEditProfileModal'
import Box from '../Box'


export default function CreatePostModal() {
  const { isOpen, Close } = useCreatePostModal()
  
  if(!isOpen) return null
  // TODO: connect form to db to persist changes
  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
