import { FaComment } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import type { IPost } from '../../typings'
import useViewPostModal from '../hooks/useViewPostModal'
interface PostProps  {
    post: IPost
}
export default function PostPreview({ post }: PostProps) {

  const viewPostModal = useViewPostModal()
  const handleClick = () => {
    if(!viewPostModal.isOpen && viewPostModal.id === null) {
      viewPostModal.setId(post.id)
      viewPostModal.Open()
    }
  }
  return (
    <div 
    onClick={handleClick}
    className='
    w-full 
    aspect-square
   bg-red-400 
    flex 
    items-center 
    gap-4 
    justify-center
    flex-col
    md:flex-row
    group
    relative
    cursor-pointer
    '>
      <div className='absolute top-0 bottom-0 left-0 right-0 group-hover:bg-black/40 group-active:bg-black/60'>
        <div className='
        text-lg
        md:text-sm
        flex
        gap-4
        justify-start
        items-center
        opacity-0
        group-hover:opacity-100
        delay-75
        transition

        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full
        '>
          <AiFillHeart size={20}/>
          <span>{ post.like_count }</span>
        </div>
        <div className='
        text-lg
        md:text-sm
        flex
        gap-4
        justify-start
        items-center
        opacity-0
        group-hover:opacity-100
        delay-75
        transition

        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5
        '>
        <FaComment size={20}/>
        <span>{ post.comment_count }</span>
      </div>
      </div>
      <img src={post.image[0]} className='object-fill aspect-square'/>
    </div>
  )
}
