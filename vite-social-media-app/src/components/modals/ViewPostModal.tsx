import React, { Suspense, useEffect, useState } from 'react';
import useViewPostModal from '../../hooks/useViewPostModal';
import { tryCatchGet } from '../../lib/fetch-helpers';
import { IPost } from '../../../typings';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import { BsArrowLeftShort } from 'react-icons/bs';
import Layout from '../../Layout';
import _ from 'lodash'
interface IPostsData {
  posts: IPost[];
}
export default function ViewPostModal() {

  const viewPostModal = useViewPostModal();
  const [posts, setPosts] = useState<IPost[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = async () =>{
      const [data, error] = 
          await tryCatchGet<IPostsData>({ 
              endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/user-posts?${new URLSearchParams({ username: viewPostModal.username  as string })}`, 
          })

          if(error) toast.error('Failed to fetch posts')

          if(data?.json?.posts) {
            const currentPost = data.json.posts.find(post => post.id === viewPostModal.id)
            const sortedPosts = _.uniqBy([currentPost, ...data.json.posts], 'id')
            setPosts(sortedPosts as IPost[])
          }

          setIsLoading(false)
        
  }
  useEffect(() => {

    const enableScroll = () => { document.body.style.overflow = 'auto' }
    const disableScroll = () => { document.body.style.overflow = 'hidden' }
  
    if(viewPostModal.id) {
      fetchPosts()
      disableScroll()
    }

    return () => enableScroll()
  }, [viewPostModal.id])


  if (!viewPostModal.isOpen || isLoading) return null;


  // TODO: set ids after fetching post
  // desktop horizontal carousel with vertical scroll
  // mobile vertical carousel
  const handleClose = () => {
    viewPostModal.removeId();
    viewPostModal.removeUsername();
    viewPostModal.Close();
  };

  const Post = React.lazy(() => import('../Post'))
  
  return (
    <div className='
    fixed 
    inset-0 
    text-white 
    z-10 
    bg-black/70 
    flex 
    flex-col
    items-center 
    justify-center 
    overflow-y-scroll'>
        
        <Suspense fallback={<Loading/>}>
          <div className='absolute top-10'>
            <Layout>
            <button
            onClick={handleClose}
            className=' 
            h-10
            w-10
            bg-neutral-700
            hover:bg-neutral-800
          
            rounded-md 
            transition

            flex
            justify-center
            items-center
            fixed
            left-4
            top-4

            opacity-30
            hover:opacity-50

            sm:opacity-100

            z-50
            sm:left-32
            sm:top-10
            '
            >
              <BsArrowLeftShort size={40} className='text-gray-400'/>
            </button>
              {posts && 
               posts.map(post => (
                <Post key={post.id} post={post}/>
               ))
             }
              
            </Layout>
          </div>
        </Suspense>
    </div>

    )
  
}