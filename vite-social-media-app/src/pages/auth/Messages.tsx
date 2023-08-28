import { useEffect, useState } from 'react'
import { tryCatchGet } from '../../lib/fetch-helpers'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Chat } from '../../../typings'
import Sidebar from '../../components/sections/Messages/Sidebar'
import Conversation from '../../components/sections/Messages/Conversation'


interface ChatsData {
  chats: Chat[]
}
export default function Messages() {

  const { session } = useAuth()
  const [chats, setConversations] = useState<Chat[] | null>(null)

  const fetchConversations = async () => {
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/GET/chats?userId=${session?.user.id}`

    const [data, error] = await tryCatchGet<ChatsData>({
      endpoint,
      token: session?.accessToken
    })

    if(!data?.res.ok || error) toast.error('Failed to load conversations')
    if(data?.json?.chats) setConversations(data.json.chats)

  }
  useEffect(() => {
    if(session?.accessToken)
      fetchConversations()

  },[])
  return( 
    <Sidebar chats={chats}>
      <Conversation/>
    </Sidebar>
  )
}
