import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TbMessageCircle2 as Comment } from 'react-icons/tb'
import { BiPaperPlane as Share } from 'react-icons/bi'
import { Post } from '../../typings';

interface PostFooterProps {
    handleLike: (id: string) => void;
    handleLoadComments: (id: string) => void;
    handleSharePost: (id: string) => void;
    post: Post
}
export default function PostFooter({
    handleLike,
    handleLoadComments,
    handleSharePost,
    post,
}: PostFooterProps) {

    const Heart = AiOutlineHeart || AiFillHeart

  return (
    <div className='flex flex-col'>
        <div className='flex justify justify-between gap-4 items-center py-2 px-4 h-14'>
            <div className='flex gap-3'>
                <button onClick={() => handleLike(post.id)}><Heart size={22}/></button>
                <button onClick={() => handleLoadComments(post.id)}><Comment size={22}/></button>
                <button onClick={() => handleSharePost(post.id)}><Share size={22}/></button>
            </div>
            <button className='text-blue-400 transition hover:text-blue-500 uppercase text-xs'>Show More</button>
            <button>
                {post.like_count} 
                <span className='font-semibold'> likes</span>
            </button>
        </div>
        <div className='mx-auto max-w-[340px]'>
            <p className='truncate'>{ post.description }</p>
        </div>
    </div>
  )
}
