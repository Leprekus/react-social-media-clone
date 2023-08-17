
import { TbMessageCircle2 as Comment } from 'react-icons/tb'
import { BiPaperPlane as Share } from 'react-icons/bi'
import { IPost } from '../../typings';
import LikedButton from './ui/LikedButton';
import { CommentsTrigger } from './Comments';

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


  return (
    <div className='flex flex-col'>
        <div className='flex justify justify-between gap-4 items-center py-2 px-4 h-14'>
            <div className='flex gap-3'>
                <LikedButton postId={post.id} likes={post.likes}/>
                <CommentsTrigger>
                    <button onClick={() => handleLoadComments(post.id)}>
                        <Comment size={22} className='hover:text-gray-400 transition'/>
                    </button>
                </CommentsTrigger>
                <button onClick={() => handleSharePost(post.id)}>
                    <Share size={22} className='hover:text-gray-400 transition'/>
                </button>
            </div>
            <button className='
            text-blue-400 
            transition
          hover:text-blue-500 
            uppercase 
            text-xs
            border
            border-blue-900
            px-4
            py-2
            rounded-md
            bg-blue-950
            active:bg-blue-950/50
            '>
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
