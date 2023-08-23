import { User } from '../../typings'
import Link from './Link'
import useFetchProfileImage from '../hooks/useFetchProfileImage'
import FollowsButton from './ui/FollowsButton'


interface ProfileListItemProps { user: User }
export default function ProfileListItem({ user }:ProfileListItemProps) {
  const { Img } = useFetchProfileImage(user.username, 42)
  const queryString = (new URLSearchParams({ id: user.id })).toString()

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
      <FollowsButton queryString={queryString} followers={user.followers as string[]}/>
    </Link>
  )
}
