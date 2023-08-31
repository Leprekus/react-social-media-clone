import useFetchProfileImage from '../hooks/useFetchProfileImage'
import { User } from '../../typings'

interface AvatarProps { user: User, className?: string }
export default function Avatar({ user, className }: AvatarProps) {

    const { Img } = useFetchProfileImage(user.username, 42)
  return (
    <div className={className}>
    <div className='flex items-center justify-center overflow-hidden w-20 h-20 rounded-full'>
        { Img }
    </div>
    <div className='flex flex-col gap-2'>
    <p className='font-semibold lg:text-xl'>{user.username}</p>
    <p className='lg:text-lg'>{user.name}</p>
    </div>
    </div>
  )
}
