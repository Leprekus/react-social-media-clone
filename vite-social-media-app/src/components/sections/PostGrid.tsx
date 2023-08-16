
import { Post } from '../../../typings'
import Button from '../Button'
import Link from '../Link'
import PostPreview from '../PostPreview'

export default function PostGrid() {
    const Posts:Post | []  = []

    if(Posts.length < 1) 
        return <div className='p-8 flex flex-col items-center gap-4'>
            <p className='font-semibold text-gray-400 text-lg'>Share your thoughts and moments with the community!</p>
            <Link  
            href='/create'
            className='
            w-fit
            px-4
            py-4
            border
            border-violet-900
            bg-violet-950/50
            active:bg-violet-950/20:
            transition
            rounded-md
            '>Create a Post</Link>
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
