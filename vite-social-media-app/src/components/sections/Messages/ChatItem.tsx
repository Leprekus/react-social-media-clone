
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Chat } from '../../../../typings'
import Button from '../../ui/Button'
import Avatar from '../../Avatar'
import { useAuth } from '../../../hooks/useAuth'
import { useRouter } from '../../../hooks/useRouter'

interface ChatProps { chat: Chat }
dayjs.extend(relativeTime)
export default function ConversationItem({ chat }: ChatProps) {
  const { session } = useAuth()
  const [ user ] = chat.users.filter(user => user.id !== session?.user.id)
  const router = useRouter()
  return (
    <Button 
      onClick={() => router.push(`/messages/${user.id}`)}
      className='
        text-lg md:text-base
        w-full
        py-1.5
        bg-gray-400/20
        transition
        hover:bg-gray-400/10
        active:bg-gray-400/0
        border-none

        flex
        items-center
    '>
      <Avatar user={user} className='flex flex-grow gap-4 items-center'/>
      {dayjs(chat.created_at).fromNow()}
    
    </Button>
  )
}
