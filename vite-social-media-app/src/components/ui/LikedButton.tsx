import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { tryCatchPost } from '../../lib/fetch-helpers';

interface LikedButtonProps {
    queryString: URLSearchParams;
    likes: string[]

}

export default function LikedButton({ queryString, likes }: LikedButtonProps) {
    const { session } = useAuth()
   
    const [isLiked, setIsLiked] = useState(
        !!likes?.find(userId => userId === session?.user.id) ||
        false
        )

    const Heart = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {
        
        console.log({ queryString : queryString.toString()})

        const [ data, error ] = await tryCatchPost({ 
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/POST/like?${queryString}`,  
            payload: { like: !isLiked, userId: session?.user.id },
            token: session?.accessToken
        })

        if(error || !data?.res.ok) setIsLiked(isLiked)
        if(data?.res.ok) setIsLiked(!isLiked)
        else setIsLiked(false)
    }
  return (
    <button onClick={handleLike}>
        <Heart size={22} className={`transition ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-gray-400'}`}/>
    </button>
  )
}
