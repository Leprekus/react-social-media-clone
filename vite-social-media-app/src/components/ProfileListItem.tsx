import { User } from '../../typings'
import Button from './ui/Button'
import Link from './Link'
import useFetchProfileImage from '../hooks/useFetchProfileImage'

interface ProfileListItemProps { user: User }
export default function ProfileListItem({ user }:ProfileListItemProps) {

  const { Img } = useFetchProfileImage(user.username, 42)

  return (
    <Link 
    href={`/${user.username}`}
    className='
      flex
      items-center 
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
      sm:active:bg-neutral-900/70
      sm:border-b
      sm:border-gray-500

      cursor-pointer
      transition
      relative
      '>
      <div className='flex items-center justify-center overflow-hidden w-20 h-20 rounded-full'>
        { Img }
      </div>
      <div className='flex flex-col gap-2 lg:ml-20'>
        <p className='font-semibold lg:text-xl'>{user.username}</p>
        <p className='lg:text-lg'>{user.name}</p>
      </div>
      <Button className='
      absolute 
      right-4
      sm:block
      w-28 py-2
      bg-violet-950/20 
      sm:relative
      sm:left-20
      '>
        Follow
      </Button>
    </Link>
  )
}
