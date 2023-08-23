import { type IPost } from '../../typings'
import useUserListModal from '../hooks/useUserListModal'
import useLoadComments from '../hooks/useLoadComments'
import { CommentsModal } from './modals/CommentsModal'
import PostFooter from './PostFooter'
import Carousel from './ui/Carousel'
import { useEffect, useState } from 'react'
import Link from './Link'

interface PostProps {
    post: IPost
}
export default function Post({ post }:PostProps) {

 
    const loadComments = useLoadComments()
    const userList = useUserListModal()
    
    const handleSharePost = (id: string) => {
        userList.setIds([id])
        userList.Open()
    }
    
    const [src, setSrc] = useState(null)
    const fetchProfileImage = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/GET/profile/picture?userId=${post.author}`)
        const data = await res.json()
        setSrc(data.profileImage)
      }
    useEffect(() => {
        if(post.author) fetchProfileImage()
    }, [ post.author ])

  return (
    <CommentsModal>
        <div className='
            sm:w-[400px]
            h-[540px]
            bg-midnight
            rounded-md
            mx-auto
            w-[95%]
            
        '>
            <div className='p-1'>
                <Link href={`/${post.author}`} className='flex gap-4 items-center py-2 px-4 h-14  hover:bg-gray-600/10 transition w-fit rounded-md'>
                    <div className='h-10 w-10 rounded-full overflow-hidden'>
                        {src && <img src={src} className='object-fill'/>}
                    </div>
                    <p className='font-semibold'>{post.author}</p>
                </Link>
            </div>
            <Carousel images={post.image}/>
            <PostFooter
                handleLoadComments={() => loadComments.setId(post.id)}
                handleSharePost={handleSharePost}
                post={post}
            />
        </div>
    </CommentsModal>
  )
}
