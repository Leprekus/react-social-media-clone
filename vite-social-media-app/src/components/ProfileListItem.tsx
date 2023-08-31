import { User } from '../../typings'
import Link from './Link'
import FollowsButton from './ui/FollowsButton'
import ShareButton from './ui/ShareButton'
import MessageButton from './sections/Messages/MessageButton'
import useFetchProfileImage from '../hooks/useFetchProfileImage'



interface ProfileListItemProps { user: User, action?: 'share' | 'follow' | 'message' }
export default function ProfileListItem({ user, action='follow' }:ProfileListItemProps) {
 
  const { Avatar } = useFetchProfileImage(user.username)
  return (
    <Link 
    href={`/${user.username}`}
    className='
      flex
      items-center 
      justify-around
      gap-4 
      bg-midnight
      rounded-md 
      p-4
      w-full
      hover:bg-midnight/80
      active:bg-midnight/70
      sm:rounded-none
      sm:bg-neutral-950
      sm:hover:bg-neutral-900
      sm:border-b
      sm:border-gray-500

      cursor-pointer
      transition
      relative
      '>
      <Avatar user={user}/>
      {action === 'follow' && <FollowsButton id={user.id} followers={user.followers as string[]}/>}
      {action === 'share' && <ShareButton id={user.id}/>}
      {action === 'message' && <MessageButton receiverId={user.id} />}
    </Link>
  )
}
