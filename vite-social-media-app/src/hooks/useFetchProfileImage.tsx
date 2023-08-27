import { useEffect, useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { tryCatchGet } from '../lib/fetch-helpers'

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

    const Img = (!isLoading && src) ? 
    <img src={src} className='object-fill'/> :
    <BiSolidUser size={size || 60} className='object-fill text-white'/>

    return {
        error,
        Img
    }

}

export default useFetchProfileImage