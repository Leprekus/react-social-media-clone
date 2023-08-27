import React, { useState } from 'react'
import { tryCatchPost } from '../../lib/fetch-helpers'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'
import toast from 'react-hot-toast';

interface ShareButtonProps {
    id: string;
    followers: string[]
}
export default function ShareButton({ id, followers }: ShareButtonProps) {

    const { session } = useAuth()
    const [follows, setFollows] = useState(
        !!followers?.find(userId => userId === session?.user.id) ||
        false
    )

    const handleFollow = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        
        const queryString = (new URLSearchParams({ id: id })).toString()
        const [data, error] = await tryCatchPost({
          endpoint: `${import.meta.env.VITE_BACKEND_URL}api/PUT/follows?${queryString}`,
          token: session?.accessToken,
          payload: { follows: !follows, userId: session?.user.id },
          method: 'PUT'
        })

        if(error || !data?.res.ok) toast.error('Something went wrong')
        if(!error && data?.res.ok) setFollows(!follows)
      }
  
  if(id === session?.user.id) return null
  return (
    <Button 
      onClick={handleFollow}
      className='
        w-fit
        px-4
        py-2
        hover:bg-violet-950/40
        active:bg-transparent
      '
      >
        {follows ? 'Share' : 'Share'}
      </Button>
  )
}
