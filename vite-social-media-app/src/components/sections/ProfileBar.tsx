import useEditProfileModal from '../../hooks/useEditProfileModal'
import Button from '../ui/Button'
import useUserListModal from '../../hooks/useUserListModal'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileBar() {

    const { session } = useAuth()
    const userListModal = useUserListModal()
    const editProfileModal = useEditProfileModal()
    const handleFollowersList = () => {
        if(!userListModal.isOpen)  {
            userListModal.setIds([])
            userListModal.Open()
        }
    }

    const handleFollowingList = () => {
        if(!userListModal.isOpen) {
            userListModal.setIds([])
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
        rounded-full
        overflow-hidden
        '>
            <img src={session?.user.profileImage} className='h-20 w-20'/>
        </div>
        <div className='flex flex-col gap-4 pl-4 md:pl-6'>
            <div className='flex gap-4 items-center'>
                <p className='text-lg md:text-base'>{ session?.user.username }</p>
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
                        border-none
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
                    border-none
                '
                ><span className='font-semibold'>{[].length}</span> followers
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
                    border-none
                '
                ><span className='font-semibold'>{[]}</span> following
            </Button>
            <p className='w-fit py-1.5 hidden'>
                <span className='font-semibold'>
                    {[]}
                </span>
                posts
            </p>
            </div>
            <div>
                <p className='font-semibold text-lg md:text-base'>{[]}</p>
                <p className='text-lg md:text-base'>{session?.user.bio}</p>
            </div>
        </div>
       

    </div>
  )
}
