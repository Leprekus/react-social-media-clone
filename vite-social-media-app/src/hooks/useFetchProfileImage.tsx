import { useEffect, useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
const useFetchProfileImage = (username?: string, size?: number) => {

    const [src, setSrc] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    const fetchProfileImage = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/GET/profile/picture?userId=${username}`)
            const data = await res.json()
            console.log(res.ok, res.statusText)
            if(!res.ok) setError(res.statusText)
            setSrc(data.profileImage)

        } catch(e) {
            setError((e as Error).message)
        } finally { setIsLoading(false) }
    
      }

      useEffect(() => {
        if(username) fetchProfileImage()
    }, [ username, ])

    const Img = (!isLoading && src) ? 
    <img src={src} className='object-fill'/> :
    <BiSolidUser size={size || 60} clssName='object-fill text-white'/>

    return {
        error,
        Img
    }

}

export default useFetchProfileImage