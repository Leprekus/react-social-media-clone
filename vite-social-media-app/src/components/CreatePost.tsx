import React, { useEffect, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import Input from './ui/Input'
import Button from './ui/Button'
import type { IPost } from '../../typings'
import Post from './Post'
import { useAuth } from '../hooks/useAuth'
import placeholder from '../assets/placeholder-image.png'
import { tryCatchPost } from '../lib/fetch-helpers'
import { toast } from 'react-hot-toast'

interface ResponseData {
  message: string
}

export default function CreatePost() {
  const { session } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    if(isLoading)
      window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)

      
  }, [isLoading])
  
  const [post, setPost] = useState<IPost>({
    author: session?.user.username as string,
    author_image: session?.user.profileImage ? session?.user.profileImage : '',
    like_count: 0,
    comment_count: 0,
    likes: [],
    comments: [],
    image: [ placeholder ],
    id: '',
    description: '',
    created_at: 0,
  })
  const isFormEnabled = post.image.filter(img => img !== placeholder).length > 0;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target?.files) {
      
      const [ file ] = event.target.files
    
      const reader = new FileReader();
      reader.onload = () => {
        setPost(prev => {
          if(prev.image.includes(placeholder)){ 
            const images = prev.image.filter(img => img !== placeholder)
            return {
          ...prev,
          image: [...images, (reader.result as string)]
            }
          }

          return {
            ...prev,
            image: [...prev.image, (reader.result as string)]

          } 
        });
      };
      reader.readAsDataURL(file);

    } 
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(!session?.accessToken) return 

    const payload = post
    const [ data, error ] = await tryCatchPost<ResponseData>({ endpoint: `${import.meta.env.VITE_BACKEND_URL}api/POST/create-post`, payload ,token: session.accessToken})
    
     
    if(error) toast.error('Request to create post failed')

    if(!data?.res?.ok) toast.error('Unable to upload post')

    if(data?.res?.ok) toast.success('Post Created Successfully')

    setIsLoading(false)

  }
  return (
    <form 
    onSubmit={handleSubmit}
    className='p-10 flex flex-wrap gap-4 justify-center'>
      <div className='w-96 flex flex-col gap-4'>
        <span className='
              mx-auto 
              relative 
              w-24 h-24 
              bg-gray-400/40 
              flex 
              items-center 
              justify-center 
              rounded-full
              transition
              hover:bg-gray-400/80
              '>
                <AiFillCamera size={60} className='text-white'/>
                <input
                className="w-24 h-24 bg-gray-200 rounded-full absolute hover:cursor-pointer opacity-0"
                type='file'
                name='profileImage'
                accept='image/*'
                onChange={handleImageChange}
                />
          </span>
        
        <Input 
        onChange={ (e) => setPost((post) =>({ ...post, description: e.target.value })) }
        value={post.description}
        placeholder='Caption'/>
        <Button 
        type={isFormEnabled ? 'submit' : 'button'}
        className={isFormEnabled ?  '' : 'cursor-not-allowed bg-transparent active:bg-transparent'}
        disabled={isLoading}
        >Create</Button>
      </div>
      <div onClick={(e) => e.preventDefault()}>
        <Post post={post}/>
      </div>
    </form>
  )
}
