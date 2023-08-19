import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { tryCatchGet } from '../../lib/fetch-helpers';
import toast from 'react-hot-toast';
import useLoadComments from '../../hooks/useLoadComments';
import { ICommentData } from '../../../typings';
import Loading from '../Loading';
interface CommentsModalProps {
  children: ReactNode;
}


interface ICommentResponse{
  comments: ICommentData[]
}


export function CommentsModal({ children }: CommentsModalProps) {
  const loadComments = useLoadComments();
  const [comments, setComments] = useState<ICommentData[] | null>(null);
  //handles post fetching
  useEffect(() => {
    const fetchPost = async () => {
     // const query = new URLSearchParams({ id: loadComments.id as string });
      const [data, error] = await tryCatchGet<ICommentResponse>({
        endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/${loadComments.id}/comments`,
      });

      if (error || !data?.res.ok) return toast.error('Failed to load comments');

      setComments(data.json?.comments as ICommentData[]);
    };
    if (loadComments.id) fetchPost();
  }, [loadComments.id]);

  const Comments = React.lazy(() =>
    import('../Comments').then((module) => ({ default: module.Comments }))
  );

  return (
    <div
      className=' 
    h-fit 
    w-fit
    mx-auto 
    sm:pl-20'
      vaul-drawer-wrapper=''
    >

      <Suspense fallback={<Loading/>}>
        <Comments data={comments} postId={loadComments.id}>
          {children}
        </Comments>
      </Suspense>
    </div>
  );
}
