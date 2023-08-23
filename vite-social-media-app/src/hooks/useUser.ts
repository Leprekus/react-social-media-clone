import toast from 'react-hot-toast'
import { User } from '../../typings'
import { tryCatchGet } from '../lib/fetch-helpers'
import { useAuth } from './useAuth'

interface FollowersData { followers: User[] }
interface FollowingData { following: User[] }

const useUser = () => {
    const { session } = useAuth()

    const getFollowers = async (userId?: string): Promise<User[]> => {
        const [ data, error ] = await tryCatchGet<FollowersData>({
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/followers?id=${userId || session?.user.id}`,
        })
        
        if(!data?.json?.followers || error) {
            toast.error('Could not get followers')
            return []
        }
        return data.json.followers
    }
    const getFollowing = async (userId?:string) => {
        const [ data, error ] = await tryCatchGet<FollowingData>({
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/following?id=${userId || session?.user.id}`,
        })
        if(!data?.json?.following || error) {
            toast.error('Could not get following')
            return []
        }
        return data.json.following
    }

    return {
        getFollowers,
        getFollowing
    }
}

export default useUser