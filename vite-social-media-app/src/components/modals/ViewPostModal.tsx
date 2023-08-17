import React, { Suspense, useEffect, useState } from 'react';
import usePostModal from '../../hooks/useViewPostModal';
import Box from '../ui/Box';
import { tryCatchGet } from '../../lib/fetch-helpers';
import { IPost } from '../../../typings';
import toast from 'react-hot-toast';
import Loading from '../Loading';
//import Post from '../Post';

interface IPostData {
  post: IPost;
}
export default function PostModal() {
  const postModal = usePostModal();
  const [post, setPost] = useState<IPost | null>(null);

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

  if (!postModal.isOpen) return null;

  //TODO: set ids after fetching post
  //desktop horizontal carousel with vertical scroll
  //mobile vertical carousel
  const handleClose = () => {
    postModal.removeId();
    postModal.Close();
  };

  const Post = React.lazy(() => import('../Post'))
  return (
    <Box onClick={handleClose}>
      <Suspense fallback={<Loading/>}>
        {post?.image && <Post post={post} />}
      </Suspense>
    </Box>
  );
}
