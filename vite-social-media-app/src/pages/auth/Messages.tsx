import { useEffect, useState } from 'react'
import { tryCatchGet } from '../../lib/fetch-helpers'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Conversation } from '../../../typings'
import Sidebar from '../../components/sections/Messages/Sidebar'


interface ConversationsData {
  conversations: Conversation[]
}
export default function Messages() {

  const { session } = useAuth()
  const [conversations, setConversations] = useState<Conversation[] | null>(null)

  const fetchConversations = async () => {
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/GET/conversations?userId=${session?.user.id}`

    const [data, error] = await tryCatchGet<ConversationsData>({
      endpoint,
      token: session?.accessToken
    })

    if(!data?.res.ok || error) toast.error('Failed to load conversations')
    if(data?.json?.conversations) setConversations(data.json.conversations)

  }
  useEffect(() => {
    if(session?.accessToken)
      fetchConversations()

  },[])
  return( 
    <Sidebar conversations={conversations}>
      
    </Sidebar>
  )
}
