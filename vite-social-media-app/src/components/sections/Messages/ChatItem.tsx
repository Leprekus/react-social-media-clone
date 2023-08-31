
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Chat } from '../../../../typings'
import Button from '../../ui/Button'
import { BsChevronRight } from 'react-icons/bs'
import { useAuth } from '../../../hooks/useAuth'
import { useRouter } from '../../../hooks/useRouter'
import useFetchProfileImage from '../../../hooks/useFetchProfileImage'

interface ChatProps { chat: Chat }
dayjs.extend(relativeTime)
export default function ConversationItem({ chat }: ChatProps) {
  const { session } = useAuth()
  const [ user ] = chat.users.filter(user => user.id !== session?.user.id)
  const { Img, Avatar } = useFetchProfileImage(user.username)
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
        group
    '>
      <Img className='hidden sm:block md:hidden w-10 h-10'/>
      <Avatar user={user} className='flex flex-grow gap-4 items-center sm:hidden md:flex '/>
      <div className='flex flex-col items-center sm:hidden md:block'>
        <BsChevronRight className='group-hover:translate-x-2 transition group-hover:text-violet-600'/>
        <span className='relative top-5 text-xs sm:hidden'>{dayjs(chat.created_at).fromNow()}</span>
      </div>
    
    </Button>
  )
}
