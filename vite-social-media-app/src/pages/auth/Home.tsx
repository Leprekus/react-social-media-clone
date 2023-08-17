
import { useEffect, useState } from 'react'
import Post from '../../components/Post'
import { IPost } from '../../../typings'
import { tryCatchGet } from '../../lib/fetch-helpers'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import Link from '../../components/Link'

interface IPostData {
  posts: IPost[]
}

export default function Home() {
  
    const [posts, setPosts] = useState<IPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchPosts = async () =>{
        const [data, error] = 
            await tryCatchGet<IPostData>({ 
                endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/feed`, 
            })

            if(error) toast.error('Failed to fetch posts')

            if(data?.json?.posts) setPosts(data.json.posts)

            setIsLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    
    if(isLoading) return <Loading/>

    if(posts.length < 1) 
        return <div className='p-8 flex flex-col items-center gap-4'>
            <p className='font-semibold text-gray-400 text-lg'>Share your thoughts and moments with the community!</p>
            <Link 
            className='
            px-4
            py-4
            rounded-md
            border
            border-violet-900
            focus:outline-violet-900
            bg-violet-950/70
            text-violet-400
            active:bg-violet-950/50
            transition
            '
            href='/create-post'>Create a Post</Link>
        </div>
  return (
    <div>
      {
        posts.map(data => (
          <Post post={data} key={data.id}/>
        ))
      }
    </div>
  )
}
