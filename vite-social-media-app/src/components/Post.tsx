import { type IPost } from '../../typings'
import useUserListModal from '../hooks/useUserListModal'
import useLoadComments from '../hooks/useLoadComments'
import { CommentsModal } from './modals/CommentsModal'
import PostFooter from './PostFooter'
import Carousel from './ui/Carousel'

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
    
    // const samplePost:IPost = {
    //     comment_count: 356,
    //     comments: Array(356).fill('the comment'),
    //     like_count: 954,
    //     likes: Array(954).fill('user_id'),
    //     image: '',
    //     id: Math.floor(Math.random() * 9999).toString(),
    //     description: 'The quick brown fox jumped over the lazy dog.'
    // }

  return (
    <CommentsModal>
        <div className='
            w-[400px]
            h-[540px]
            bg-midnight
            rounded-md
            mx-auto
        '>
            <div className='flex gap-4 items-center py-2 px-4 h-14'>
                <div className='h-10 w-10 rounded-full bg-red-500'/>
                <p className='font-semibold'>{post.author}</p>
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
