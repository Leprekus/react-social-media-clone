import { useEffect, useState } from 'react'
import usePostModal from '../../hooks/useViewPostModal'
import Box from '../ui/Box'
import { tryCatchGet } from '../../lib/fetch-helpers'
import { IPost } from '../../../typings'
import toast from 'react-hot-toast'
import Post from '../Post'

interface IPostData {
  post: IPost

}
export default function PostModal() {
  const postModal = usePostModal()
  const [post, setPost] = useState({})
  useEffect(() => {
    const fetchPost = async () => {
      const query = new URLSearchParams({ id: postModal.id as string})
      console.log({ query: query.toString() })
      const [data, error] = await tryCatchGet<IPostData>({ 
        endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/post&${query}` 
      })
      if(error) 
        return toast.error('Failed to load post')

      setPost(data?.json?.post as IPost)
    }
    if(postModal.id)
      fetchPost()

  }, [postModal.id])

  if(!postModal.isOpen) return null
  
  //TODO: fetch post info with id
  const handleClose = () => {
    postModal.removeId()
    postModal.Close()
  }


  console.log(post)
  return (
    <Box
      onClick={handleClose}
    >
      <Post post={post as IPost}/>
    </Box>
  )
}
