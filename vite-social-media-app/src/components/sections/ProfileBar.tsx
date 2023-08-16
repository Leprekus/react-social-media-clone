import user from '../../../mock/user.json'
import useEditProfileModal from '../../hooks/useEditProfileModal'
import Button from '../ui/Button'
import useUserListModal from '../../hooks/useUserListModal'

export default function ProfileBar() {

    const userListModal = useUserListModal()
    const editProfileModal = useEditProfileModal()
    const handleFollowersList = () => {
        if(!userListModal.isOpen)  {
            userListModal.setIds(user.followers)
            userListModal.Open()
        }
    }

    const handleFollowingList = () => {
        if(!userListModal.isOpen) {
            userListModal.setIds(user.following)
            userListModal.Open()
        }
            
    }
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
                onClick={handleFollowersList}
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
                ><span className='font-semibold'>{user.followers.length}</span> followers
            </Button>
            <Button
                onClick={handleFollowingList}
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
                ><span className='font-semibold'>{user.following.length}</span> following
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
