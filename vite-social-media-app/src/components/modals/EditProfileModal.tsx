import useEditProfileModal from '../../hooks/useEditProfileModal'
import Box from '../Box'


export default function EditProfileModal() {
  const { isOpen, Close } = useEditProfileModal()
  
  if(!isOpen) return null

  return (
    <Box
      onClick={Close}
    >
    </Box>
  )
}
