import React, { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import Input from './ui/Input'
import Button from './ui/Button'
import type { IPost } from '../../typings'
import Post from './Post'
import { useAuth } from '../hooks/useAuth'
import placeholder from '../assets/placeholder-image.png'
import Carousel from './ui/Carousel'
export default function CreatePost() {
  const { session } = useAuth()
  const [selectedImgs, setSelectedImgs] = useState<string[] | ArrayBuffer | null>(null)
  
  const [post, setPost] = useState<IPost>({
    author: session?.user.username as string,
    author_image: '',
    like_count: 934,
    comment_count: 234,
    likes: [''],
    comments: [''],
    image: placeholder,
    id: 'some-id',
    description: '',
  })
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target?.files) {
      
      const [ file ] = event.target.files
    
      const reader = new FileReader();
      reader.onload = () => {
        console.log({ res  : reader.result })
        setSelectedImgs(prev => [...(prev as string[]), (reader.result as string)]);
      };
      reader.readAsDataURL(file);

    } 
  }
  return (
    <div className='p-10 flex flex-wrap gap-4 justify-center'>
      <div className='w-96'>
        {selectedImgs ? 
              <>
              <img 
              className="w-24 h-24 bg-gray-200 rounded-full mx-auto object-cover shadow-md" 
              src={(selectedImgs as string)}
              />
              {/* <Carousel 
              images={selectedImgs as string[]}/> */}
              </>
              :<span className='
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
        }
        <Input 
        onChange={ (e) => setPost((post) =>({ ...post, description: e.target.value })) }
        value={post.description}
        placeholder='Caption'/>
        <Button>Create</Button>
      </div>
      <Post post={post}/>
    </div>
  )
}
