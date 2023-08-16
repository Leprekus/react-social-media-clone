import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import userUser from '../useUser';

interface LikedButtonProps {
    postId: string;

}

export default function LikedButton({ postId }: LikedButtonProps) {
    const user = userUser()
    const [isLiked, setIsLiked] = useState(false)
    const Heart = isLiked ? AiFillHeart : AiOutlineHeart
    useEffect(() => {

        const match = user.getLiked().find(id => id === postId)
        if(match) setIsLiked(true)

}, [user.getLiked().length])
    const handleLike = async () => {
        const res = await user.like(postId)
        //TODO: handle like
    }
  return (
    <button onClick={handleLike}>
        <Heart size={22} className={`transition ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-gray-400'}`}/>
    </button>
  )
}
