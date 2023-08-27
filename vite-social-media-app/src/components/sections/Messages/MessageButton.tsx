import React from 'react'
import Button from '../../ui/Button'
import { useRouter } from '../../../hooks/useRouter'
import useSearchModal from '../../../hooks/useSearchModal'
import { useAuth } from '../../../hooks/useAuth'

interface MessageButtonProps {
  receiverId: string
}
export default function MessageButton({ receiverId }: MessageButtonProps) {
  const router = useRouter()
  const searchModal = useSearchModal()
  const { session } = useAuth()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(searchModal.isOpen) {
      event.stopPropagation()
      event.preventDefault()
      router.push('/messages/test')
      searchModal.Close()
    }
    console.log({ receiverId, senderId: session?.user.id })
  }
  return (
    <Button 
    onClick={handleClick}
    className='
      w-fit
      py-2
      bg-violet-950/20 
      hover:bg-violet-950/60
      active:bg-violet-950
      relative
    '>Message</Button>
  )
}
