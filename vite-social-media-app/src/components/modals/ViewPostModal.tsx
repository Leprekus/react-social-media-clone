import usePostModal from '../../hooks/useViewPostModal'
import Box from '../Box'


export default function PostModal() {
  const postModal = usePostModal()
  if(!postModal.isOpen) return null
  
  //TODO: fetch post info with id
  const handleClose = () => {
    postModal.removeId()
    postModal.Close()
  }

  return (
    <Box
      onClick={handleClose}
    >
      <p>{ postModal.id }</p>
    </Box>
  )
}
