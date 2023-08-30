import { useEffect, useState } from 'react'
import { useRouter } from '../../../hooks/useRouter'
import { BsArrowLeftShort } from 'react-icons/bs'
import { useAuth } from '../../../hooks/useAuth'
import { tryCatchPost } from '../../../lib/fetch-helpers'
import { ClientMessage, Conversation as IConversation } from '../../../../typings'
import toast from 'react-hot-toast'
import ChatInput from '../../ChatInput'
import ChatInputSkeleton from '../../skeletons/ChatInputSkeleton'

interface ConversationData {
    conversation: IConversation
}
export default function Conversation() {
    const { session } = useAuth()
    const router = useRouter() 
    const pathname = router.pathname.split('/')
    const receiverId = pathname.includes('messages') && pathname[2] ?
    pathname[2] : null
    const [conversation, setConversation] = useState<IConversation | null>(null)

    const fetchConversation = async () => {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/POST/messages`
        const payload = { senderId: session?.user.id, receiverId}
        const [data, error] = await tryCatchPost<ConversationData>({
            endpoint, 
            payload,
            token: session?.accessToken
        })

        if(!data?.res.ok || error) toast.error('Failed to load conversation')
        if(data?.json?.conversation) return setConversation(data.json.conversation)
        setConversation(null)
    }
    useEffect(() => {
        if(receiverId)
            fetchConversation()
    },[receiverId])

  if(!receiverId) return null
  return (
    <div 
    className='
    text-white 
    absolute 
    inset-0
    bg-black
    w-full
    sm:static
      '>
        <div 
        className='
            border-b
            border-zinc-600
            p-4
            w-full
        '>
            <button
            onClick={() => router.push('/messages')}
            className=' 
            h-10
            w-10
            bg-neutral-800
            hover:bg-neutral-700/70
            active:bg-neutral-700
            rounded-md 
            transition
            flex
            justify-center
            items-center
            opacity-100
            z-50
            '
            >
              <BsArrowLeftShort size={40} className='text-gray-400'/>
            </button>
        </div>
        {conversation?.messages.map((message: ClientMessage) => <div>{message.body}</div>)}
        <div 
        className='
            border-b
            border-zinc-600
            p-4
            w-full
        '>
            {conversation?.id ? 
            <ChatInput 
              className='bg-transparent border-transparent'
              endpoint={conversation.id}/> : 
            <ChatInputSkeleton/>
            }
        </div>
    </div>
  )
}
