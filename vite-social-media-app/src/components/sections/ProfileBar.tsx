import user from '../../../mock/user.json'
import useEditProfileModal from '../../hooks/useEditProfileModal'
import useFollowersModal from '../../hooks/useFollowersModal'
import useFollowingModal from '../../hooks/useFollowingModal'
import Button from '../Button'

export default function ProfileBar() {

    const followersModal = useFollowersModal()
    const followingModal = useFollowingModal()
    const editProfileModal = useEditProfileModal()
  return (
    <div className='flex gap-4 p-8'>
        <div className='
        w-20 
        h-20 
        md:h-40
        md:w-40
        bg-gray-400
        rounded-full
        overflow-hidden
        '>
            <img src={user.avatar} className='object-fit'/>
        </div>
        <div className='flex flex-col gap-4 pl-4 md:pl-6'>
            <div className='flex gap-4 items-center'>
                <p className='text-lg md:text-base'>{ user.username }</p>
                <Button
                    onClick={editProfileModal.Open}
                    className='
                        text-lg md:text-base
                        w-fit
                        py-1.5
                        bg-gray-400/20
                        transition
                        hover:bg-gray-400/10
                        active:bg-gray-400/0
                    '
                >Edit Profile</Button>
            </div>
            <div className='flex gap-4 items-center flex-wrap'>
            <Button
                onClick={followersModal.Open}
                className='
                    text-lg
                    md:text-base
                    w-fit
                    py-1.5
                    bg-gray-400/20
                    transition
                    hover:bg-gray-400/10
                    active:bg-gray-400/0
                '
                ><span className='font-semibold'>{user.followers}</span> followers
            </Button>
            <Button
                onClick={followingModal.Open}
                className='
                    text-lg
                    md:text-base
                    w-fit
                    py-1.5
                    bg-gray-400/20
                    transition
                    hover:bg-gray-400/10
                    active:bg-gray-400/0
                '
                ><span className='font-semibold'>{user.following}</span> following
            </Button>
            <p className='w-fit py-1.5 hidden'>
                <span className='font-semibold'>
                    {user.posts}
                </span>
                posts
            </p>
            </div>
            <div>
                <p className='font-semibold text-lg md:text-base'>{user.name}</p>
                <p className='text-lg md:text-base'>{user.bio}</p>
            </div>
        </div>
       

    </div>
  )
}
