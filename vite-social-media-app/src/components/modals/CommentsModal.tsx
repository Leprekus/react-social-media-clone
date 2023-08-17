import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { tryCatchGet } from '../../lib/fetch-helpers';
import toast from 'react-hot-toast';
import useLoadComments from '../../hooks/useLoadComments';
import { IPost } from '../../../typings';

interface CommentsModalProps {
  children: ReactNode;
}
interface IPostData {
  post: IPost;
}

export function CommentsModal({ children }: CommentsModalProps) {
  const loadComments = useLoadComments();
  const [post, setPost] = useState<IPost | null>(null);
  //handles post fetching
  useEffect(() => {
    const fetchPost = async () => {
      const query = new URLSearchParams({ id: loadComments.id as string });

      const [data, error] = await tryCatchGet<IPostData>({
        endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/post?${query}`,
      });

      if (error) return toast.error('Failed to load post');

      setPost(data?.json?.post as IPost);
    };
    if (loadComments.id) fetchPost();
  }, [loadComments.id]);

  const Comments = React.lazy(() =>
    import('../Comments').then((module) => ({ default: module.Comments }))
  );

  //console.log({id : loadComments.id})
  return (
    <div
      className=' 
    h-fit 
    w-fit
    mx-auto 
    sm:pl-20'
      vaul-drawer-wrapper=''
    >

      <Suspense>
        <Comments post={post}>{children}</Comments>
      </Suspense>
    </div>
  );
}
