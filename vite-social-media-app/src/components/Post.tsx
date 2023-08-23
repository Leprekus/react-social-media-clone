import { type IPost } from '../../typings'
import useUserListModal from '../hooks/useUserListModal'
import useLoadComments from '../hooks/useLoadComments'
import { CommentsModal } from './modals/CommentsModal'
import PostFooter, { CreatePostFooterPreview } from './PostFooter'
import Carousel from './ui/Carousel'
import Link from './Link'
import useFetchProfileImage from '../hooks/useFetchProfileImage'
import useUser from '../hooks/useUser'

interface PostProps {
    post: IPost
}

export default function Post({ post }:PostProps) {

 
    const loadComments = useLoadComments()
    const userListModal = useUserListModal()
    const user = useUser()

    const { Img } = useFetchProfileImage(post.author)
    const handleSharePost = async () => {
        if(!userListModal.isOpen)  {
            const followers = await user.getFollowers()
            userListModal.setUsers(followers)
            userListModal.Open()
        }
    }
    
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
                    <div className='h-10 w-10 rounded-full flex items-center justify-center overflow-hidden'>
                        {Img}
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


interface CreatePostPreviewProps { post: IPost }
export function CreatePostPreview ({ post }: CreatePostPreviewProps) {

    const { Img } = useFetchProfileImage(post.author)
    const handleSharePost = () => {}
    return (
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
                    <div className='h-10 w-10 rounded-full flex items-center justify-center overflow-hidden'>
                        {Img}
                    </div>
                    <p className='font-semibold'>{post.author}</p>
                </Link>
            </div>
            <Carousel images={post.image}/>
            <CreatePostFooterPreview
                handleLoadComments={() => null}
                handleSharePost={handleSharePost}
                post={post}
            />
        </div>
    )
}