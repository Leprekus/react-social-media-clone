import React, { Suspense, useEffect, useState } from 'react';
import useViewPostModal from '../../hooks/useViewPostModal';
import { tryCatchGet } from '../../lib/fetch-helpers';
import { IPost } from '../../../typings';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import { IoIosClose } from 'react-icons/io';

interface IPostData {
  post: IPost;
}
export default function ViewPostModal() {

  const viewPostModal = useViewPostModal();
  const [post, setPost] = useState<IPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = async () =>{
      const [data, error] = 
          await tryCatchGet<IPostData>({ 
              endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/post?${new URLSearchParams({ id: viewPostModal.id  as string })}`, 
          })

          if(error) toast.error('Failed to fetch posts')

          if(data?.json?.post) setPost(data.json.post)

          setIsLoading(false)
        
  }
  useEffect(() => {
    if(viewPostModal.id) fetchPosts()
  }, [viewPostModal.id])


  if (!viewPostModal.isOpen || isLoading) return null;


  // TODO: set ids after fetching post
  // desktop horizontal carousel with vertical scroll
  // mobile vertical carousel
  const handleClose = () => {
    viewPostModal.removeId();
    viewPostModal.Close();
  };

  const Post = React.lazy(() => import('../Post'))
  
  return (
    <div className='relative text-white'>
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
          absolute
          right-4
          top-4
          '
          >
            <IoIosClose size={40} className='text-gray-400'/>
          </button>
        <Suspense fallback={<Loading/>}>
          {post && <Post  post={post}/>}
        </Suspense>
    </div>

    )
  
}