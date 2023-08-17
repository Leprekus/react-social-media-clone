import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import userUser from '../useUser';
import { useAuth } from '../../hooks/useAuth';

interface LikedButtonProps {
    postId: string;

}

export default function LikedButton({ postId }: LikedButtonProps) {
    const { session } = useAuth()
    const user = userUser()
    const [isLiked, setIsLiked] = useState(false)
    const Heart = isLiked ? AiFillHeart : AiOutlineHeart
    useEffect(() => {

        

}, [])
    const handleLike = async () => {
        const res = await user.like(
            postId, 
            session?.accessToken as string,
            !isLiked
            )
        //TODO: handle like
        const vote = true
        setIsLiked(vote)
    }
  return (
    <button onClick={handleLike}>
        <Heart size={22} className={`transition ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-gray-400'}`}/>
    </button>
  )
}
