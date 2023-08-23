import useEditProfileModal from '../../hooks/useEditProfileModal'
import Button from '../ui/Button'
import useUserListModal from '../../hooks/useUserListModal'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from '../../hooks/useRouter'
import { User } from '../../../typings'
import Loading from '../Loading'
import useFetchProfileImage from '../../hooks/useFetchProfileImage'
export default function ProfileBar() {

    const { session, signOut } = useAuth()
    const pathname = useRouter().pathname.split('/')
    const username = pathname.at(-1)
    const isAdmin = session?.user.username === username
    const [userData, setUserData] = useState<User | null>(null)
    const { Img } = useFetchProfileImage(userData?.username)
    
    const fetchData = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/GET/user?username=${username}`)
        const data = await res.json()
        setUserData(data.user)
    }

    useEffect(() => {
        if(username) fetchData()
    
    }, [ username, ])
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


    if(!userData) return <Loading/>
    
  return (
    <div className='flex gap-4 p-8'>
        <div className='
        w-20 
        h-20 
        md:h-40
        md:w-40
        rounded-full
        overflow-hidden
        flex 
        items-center
        justify-center
        bg-gray-400
        '>
            {Img}
        </div>
        <div className='flex flex-col gap-4 pl-4 md:pl-6'>
            <div className='flex gap-4 items-center'>
                <p className='text-lg md:text-base'>{ userData.username }</p>
                {isAdmin &&
                <>
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
                <Button
                    onClick={signOut}
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
                >Log Out</Button>
                </>
                }
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
                ><span className='font-semibold'>{session?.user.followers_count}</span> followers
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
                ><span className='font-semibold'>{session?.user.following_count}</span> following
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
                <p className='text-lg md:text-base'>{userData.bio}</p>
            </div>
        </div>
       

    </div>
  )
}
