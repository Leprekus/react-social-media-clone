
import { TbMessageCircle2 as Comment } from 'react-icons/tb'
import { BiPaperPlane as Share } from 'react-icons/bi'
import { IPost } from '../../typings';
import LikedButton from './ui/LikedButton';

interface PostFooterProps {
    handleLoadComments: (id: string) => void;
    handleSharePost: (id: string) => void;
    post: IPost
}
export default function PostFooter({
    handleLoadComments,
    handleSharePost,
    post,
}: PostFooterProps) {
console.log({ id: post.id})

  return (
    <div className='flex flex-col'>
        <div className='flex justify justify-between gap-4 items-center py-2 px-4 h-14'>
            <div className='flex gap-3'>
                <LikedButton postId={post.id}/>
                <button onClick={() => handleLoadComments(post.id)}>
                    <Comment size={22}/>
                </button>
                <button onClick={() => handleSharePost(post.id)}>
                    <Share size={22}/>
                </button>
            </div>
            <button className='
            text-blue-400 
            transition
          hover:text-blue-500 
            uppercase 
            text-xs'>
                Show More
            </button>
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
