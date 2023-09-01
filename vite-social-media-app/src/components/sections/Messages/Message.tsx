import React, { Suspense, useEffect, useState } from 'react'
import { ClientMessage, IPost } from '../../../../typings'
import { useAuth } from '../../../hooks/useAuth'

interface MessageProps { message: ClientMessage}
export default function Message({ message }: MessageProps) {
    const { session } = useAuth()
    const senderStyle = `
        right-4
        from-violet-950
        to-violet-950/50
        border
        border-violet-800

        `
    const receiverStyle = `
        left-4
        from-blue-950
        to-blue-950/50
        border
        border-blue-800
        `

  const [post, setPost] = useState<IPost | null>(null)
  const fetchPost = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/GET/post?id=${message.body}`)
    const data = await res.json()
    setPost(data.post)
  }
  useEffect(() => {
    if(message.type === 'Post')
        fetchPost()
  }, [])
  const Post = React.lazy(() => import('../../Post'))
    
  
  return message?.type === 'Text' ? 
  (
    <div className={`w-full relative min-h-[40px] h-fit flex px-4 ${message.userId === session?.user.id ? 'justify-end pl-10' : 'justify-start pr-10'}` }>
        <div
            className={`
            w-fit
            ${message.userId === session?.user.id ? senderStyle : receiverStyle}
            bg-gradient-to-br
            py-1
            px-4
            rounded-md
            flex
            items-center
            justify-center
            `}
        >
            <p>{ message.body }</p>
        </div>
    </div>
  ) : 
  (<>{
    post && 
  <Suspense>
    <Post post={post}/>
  </Suspense>}
 </>)
}
