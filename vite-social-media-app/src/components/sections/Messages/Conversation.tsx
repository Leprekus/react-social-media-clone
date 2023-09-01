import { useEffect, useState } from 'react'
import { useRouter } from '../../../hooks/useRouter'
import { BsArrowLeftShort } from 'react-icons/bs'
import { useAuth } from '../../../hooks/useAuth'
import { tryCatchPost } from '../../../lib/fetch-helpers'
import { ClientMessage, Conversation as IConversation } from '../../../../typings'
import toast from 'react-hot-toast'
import ChatInput from '../../ChatInput'
import ChatInputSkeleton from '../../skeletons/ChatInputSkeleton'
import Message from './Message'

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

    overflow-y-scroll
      '>
        <div className='flex flex-col justify-between'>
          <div
          className='
              border-b
              border-zinc-600
              p-4
              w-full
              fixed
              bg-black
              z-50
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
          <div
          className='
        

          pt-24
          min-h-[300px]
          h-fit
          flex
          flex-col
          gap-4
          pb-40
          '>
            {conversation?.messages.map((message: ClientMessage) => <Message message={message}/>)}
          </div>
          <div
          className='
              border-t
              border-zinc-600
              p-4
              w-full
              bottom-0
              fixed
              bg-black
              z-50
              flex
              justify-center
          '>
              <div className='flex justify-center w-full relative sm:right-32'>
                {conversation?.id ?
                <ChatInput
                  className='bg-transparent border-transparent w-fit'
                  method='PUT'
                  endpoint={
                    `${import.meta.env.VITE_BACKEND_URL}api/PUT/messages?conversationId=${conversation.id}&type=Text`
                  }/> :
                <ChatInputSkeleton/>
                }
              </div>
          </div>
        </div>
    </div>
  )
}
