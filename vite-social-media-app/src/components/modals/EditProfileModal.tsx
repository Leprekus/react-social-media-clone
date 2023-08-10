import useEditProfileModal from '../../hooks/useEditProfileModal'
import Box from '../Box'


export default function EditProfileModal() {
  const { isOpen, Close } = useEditProfileModal()
  
  if(!isOpen) return null
  // TODO: connect form to db to persist changes
  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
