/*
import React, { Suspense, useEffect, useState } from 'react';
import usePostModal from '../../hooks/useViewPostModal';
import Box from '../ui/Box';
import { tryCatchGet } from '../../lib/fetch-helpers';
import { IPost } from '../../../typings';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import Carousel from '../ui/Carousel';

//import Post from '../Post';

interface IPostData {
  post: IPost;
}
export default function PostModal() {
  const postModal = usePostModal();
  const [post, setPost] = useState<IPost | null>(null);

  //handles post fetching
  useEffect(() => {
    const fetchPost = async () => {
      const query = new URLSearchParams({ id: postModal.id as string });

      const [data, error] = await tryCatchGet<IPostData>({
        endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/post?${query}`,
      });

      if (error) return toast.error('Failed to load post');

      setPost(data?.json?.post as IPost);
    };
    if (postModal.id) fetchPost();
  }, [postModal.id]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //handles component rendering
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!postModal.isOpen) return null;

  //TODO: set ids after fetching post
  //desktop horizontal carousel with vertical scroll
  //mobile vertical carousel
  const handleClose = () => {
    postModal.removeId();
    postModal.Close();
  };

  const Comments =
    windowWidth < 640
      ? React.lazy(() => import('./CommentsModal'))
      : React.lazy(() => import('../Comments'));
  return windowWidth < 640 ? (
    <Suspense>
      <Comments />
    </Suspense>
  ) : (
    <Box onClick={handleClose} className='w-full h-full p-14'>
      <Suspense fallback={<Loading />}>
        {post?.image && (
          <>
            <div
              className='
          flex 
          flex-col 
          items-center gap-4'
            >
              <Carousel images={post?.image} />
              <Suspense>
                <Comments />
              </Suspense>
            </div>
          </>
        )}
      </Suspense>
    </Box>
  );
}
*/