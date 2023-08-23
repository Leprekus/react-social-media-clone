import React, { useState } from 'react'
import { tryCatchPost } from '../../lib/fetch-helpers'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'
import toast from 'react-hot-toast';

interface FollowsButtonProps {
    queryString: string;
    followers: string[]
}
export default function FollowsButton({ queryString, followers }: FollowsButtonProps) {

    const { session } = useAuth()
    const [follows, setFollows] = useState(
        !!followers?.find(userId => userId === session?.user.id) ||
        false
    )

    const handleFollow = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        
        const [data, error] = await tryCatchPost({
          endpoint: `${import.meta.env.VITE_BACKEND_URL}api/PUT/follows?${queryString}`,
          token: session?.accessToken,
          payload: { follows: !follows, userId: session?.user.id },
          method: 'PUT'
        })

        if(error || !data?.res.ok) toast.error('Something went wrong')
        if(!error && data?.res.ok) setFollows(!follows)
      }
  return (
    <Button 
      onClick={handleFollow}
      className='
      absolute 
      right-4
      sm:block
      w-28 py-2
      bg-violet-950/20 
      hover:bg-violet-950/60
      active:bg-violet-950
      sm:relative
      sm:left-20
      
      '
      >
        {follows ? 'Following' : 'Follow'}
      </Button>
  )
}
