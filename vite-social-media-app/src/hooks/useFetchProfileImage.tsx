import { useEffect, useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { tryCatchGet } from '../lib/fetch-helpers'
import { User } from '../../typings'
import { twMerge } from 'tailwind-merge'

interface ProfilePictureData {
    profileImage: string
}
const useFetchProfileImage = (username?: string, size?: number) => {

    const [src, setSrc] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    const fetchProfileImage = async () => {
        try {
            const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/GET/profile/picture?username=${username}`
            const [data, error] = await tryCatchGet<ProfilePictureData>({ endpoint })
            //const data = await res.json()
            //console.log(res.ok, res.statusText)
            if(!data?.res.ok || error) setError(data?.res?.statusText as string ?? (error as Error).message)
            if(data?.json?.profileImage) setSrc(data?.json?.profileImage)

        } catch(e) {
            setError((e as Error).message)
        } finally { setIsLoading(false) }
    
      }

      useEffect(() => {
        if(username) fetchProfileImage()
    }, [ username, ])

    const Img = ({ className }: { className?: string; }) => (!isLoading && src) ? 
    <img src={src} className={twMerge('object-fill', className)}/> :
    <BiSolidUser size={size || 60} className={twMerge('object-fill text-white', className)}/>

    const Avatar = ({ className, user }: { className?:string, user: User}) => (
        <div className={twMerge('flex items-center gap-4',className)}>
        <div className='flex items-center justify-center overflow-hidden w-20 h-20 rounded-full'>
            <Img/>
        </div>
        <div className='flex flex-col gap-2'>
        <p className='font-semibold lg:text-xl'>{user.username}</p>
        <p className='lg:text-lg'>{user.name}</p>
        </div>
        </div>
      )

    return {
        error,
        Img,
        Avatar
    }

}

export default useFetchProfileImage