import React from 'react'
import { tryCatchPost } from '../../lib/fetch-helpers'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'
import toast from 'react-hot-toast';
import useUserListModal from '../../hooks/useUserListModal';
import { Conversation } from '../../../typings';

interface ConversationData {
  conversation: Conversation
}
interface ShareButtonProps {
    id: string;
}
export default function ShareButton({ id }: ShareButtonProps) {

    const { session } = useAuth()
    const { postId } = useUserListModal()

    const createConversation = async (): Promise<Conversation | null> => {

      const receiverId = id
      const senderId = session?.user.id

      const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/POST/messages`
        const payload = { senderId, receiverId}
        const [data, error] = await tryCatchPost<ConversationData>({
            endpoint, 
            payload,
            token: session?.accessToken
        })

        if(!data?.res.ok || error) return null
        if(data.json?.conversation) return data.json.conversation
        return null
        
    }
    const handleShare = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      e.preventDefault()
      
      const conversation = await createConversation()
      if(!conversation) return toast.error('Something went wrong')

        const [data, error] = await tryCatchPost({
          endpoint: `${import.meta.env.VITE_BACKEND_URL}api/PUT/messages?conversationId=${conversation.id}&type=Post`,
          token: session?.accessToken,
          payload: { body: postId },
          method: 'PUT'
        })

        if(error || !data?.res.ok) toast.error('Something went wrong')
        if(!error && data?.res.ok) toast.success('Sent')
      }
  
  if(id === session?.user.id) return null
  return (
    <Button 
      onClick={handleShare}
      className='
        w-fit
        px-4
        py-2
        hover:bg-violet-950/40
        active:bg-transparent
      '
      >
        Share
      </Button>
  )
}
