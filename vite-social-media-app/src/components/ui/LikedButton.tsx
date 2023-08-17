import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { tryCatchPost } from '../../lib/fetch-helpers';

interface LikedButtonProps {
    postId: string;
    likes: string[]

}

export default function LikedButton({ postId, likes }: LikedButtonProps) {
    const { session } = useAuth()
   
    const [isLiked, setIsLiked] = useState(
        !!likes.find(user => user === session?.user.username) ||
        false
        )

    const Heart = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {
        const queryString = new URLSearchParams({ id: postId })

        const [ data, error ] = await tryCatchPost({ 
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/POST/like?${queryString}`,  
            payload: { like: !isLiked, username: session?.user.username },
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
