import { useEffect, useState } from 'react'
import { useRouter } from '../../../hooks/useRouter'
import { BsArrowLeftShort } from 'react-icons/bs'
import { useAuth } from '../../../hooks/useAuth'
import { tryCatchPost } from '../../../lib/fetch-helpers'
import { ClientMessage, Conversation as IConversation } from '../../../../typings'
import toast from 'react-hot-toast'
import ChatInputSkeleton from '../../skeletons/ChatInputSkeleton'
import Message from './Message'
import useChatInput from '../../../hooks/useChatInput'
import useWebSocketStore from '../../../hooks/useWebSocket'
import _ from 'lodash'

interface ConversationData {
    conversation: IConversation
}
export default function Conversation() {

    const { session } = useAuth()

    const router = useRouter() 

    const pathname = router.pathname.split('/')
    const receiverId = pathname.includes('messages') && pathname[2] ?
    pathname[2] : null

    const { 
      items: conversation, 
      setItems: setConversation,
      ChatInput
    } = useChatInput<ClientMessage[] | null>(null)

    const [conversationId, setConversationId] = useState<string | null>(null)
    
    const webSocketStore = useWebSocketStore()
    const fetchConversation = async () => {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/POST/messages`
        const payload = { senderId: session?.user.id, receiverId}
        
        const [data, error] = await tryCatchPost<ConversationData>({
            endpoint, 
            payload,
            token: session?.accessToken
        })

        if(!data?.res.ok || error) toast.error('Failed to load conversation')
        if(data?.json?.conversation) {

          setConversation(data.json.conversation.messages)
          setConversationId(data.json.conversation.id)
          return
        }
        setConversation(null)
    }
    useEffect(() => {
        if(receiverId)
          fetchConversation()
    },[receiverId])

    useEffect(() => {

      if(webSocketStore.LatestMessage.length > 0) {

        const newConversation = _.uniqBy(
          [ 
            ...conversation as ClientMessage[], 
            ...webSocketStore.LatestMessage 
          ], 'id')

        setConversation(newConversation as ClientMessage[])

        webSocketStore.ClearLatestMessage()

      }

      return () => { 
        
        console.log('unmounting Conversation.tsx') 
      }
    }, [webSocketStore.WebSocket, webSocketStore.LatestMessage.length])

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
            {conversation?.map((message: ClientMessage) => 
            <Message message={message} key={message.id}/>)}
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
                {conversationId ?
                <ChatInput
                  onSubmitHandler={
                    (data: ClientMessage) => {
                      webSocketStore.Send(data) 
                    }
                  }
                  className='bg-transparent border-transparent w-fit'
                  method='PUT'
                  endpoint={
                    `${import.meta.env.VITE_BACKEND_URL}api/PUT/messages?conversationId=${conversationId}&type=Text`
                  }/> :
                <ChatInputSkeleton/>
                }
              </div>
          </div>
        </div>
    </div>
  )
}
