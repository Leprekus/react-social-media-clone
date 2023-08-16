
import { Post } from '../../../typings'
import useCreatePostModal from '../../hooks/useCreatePostModal'
import Button from '../Button'

import PostPreview from '../PostPreview'

export default function PostGrid() {
    const Posts:Post | []  = []

    const { Open } = useCreatePostModal()
    if(Posts.length < 1) 
        return <div className='p-8 flex flex-col items-center gap-4'>
            <p className='font-semibold text-gray-400 text-lg'>Share your thoughts and moments with the community!</p>
            <Button onClick={Open} className='w-fit'>Create a Post</Button>
        </div>
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5'>
        {Posts.map((post, i) => 
            <PostPreview
                post={post}
                key={i}
            />
        )}
    </div>
  )
}
