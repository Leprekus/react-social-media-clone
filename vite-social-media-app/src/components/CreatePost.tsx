import React, { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import Input from './ui/Input'
import Button from './ui/Button'
import type { IPost } from '../../typings'
import Post from './Post'

export default function CreatePost() {
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null)
  const [caption, setCaption] = useState('')
  const [post, setPost] = useState<IPost>({
    like_count: 934,
    comment_count: 234,
    likes: [''],
    comments: [''],
    image: '',
    id: '',
    description: '',
  })
  const handleImageChange = () => {

  }
  return (
    <div>
      <div className='w-96'>
        {selectedImg ? 
              <img 
              className="w-24 h-24 bg-gray-200 rounded-full mx-auto object-cover shadow-md" 
              src={(selectedImg as string)}
              />
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
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        placeholder='Caption'/>
        <Button>Create</Button>
      </div>
      <Post post={post}/>
    </div>
  )
}
