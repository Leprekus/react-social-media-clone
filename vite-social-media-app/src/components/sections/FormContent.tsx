import React from 'react'
import { BsArrowLeftSquareFill } from 'react-icons/bs'
import { BiSolidUser } from 'react-icons/bi'
import Button from '../ui/Button';
import Input from '../ui/Input';
import { NewAccount } from '../../../typings';

interface FormContentProps {
  currentPage: number;
  formData: NewAccount;
  selectedImg: string | ArrayBuffer | null;
  handleFormChange: (fieldName: string, value: string) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  totalPages: number;
}

export default function FormContent({
  currentPage,
  formData,
  selectedImg,
  handleFormChange,
  handleImageChange,
  handlePreviousPage,
  handleNextPage,
  handleSubmit,
  isLoading,
  totalPages,
}:FormContentProps) {
  return (
    <form
        onSubmit={(e) =>handleSubmit(e)}
        className="
          flex
          flex-col
          justify-end
          pb-10
          w-[400px]
          h-[500px]
          gap-2
          mx-auto
          text-gray-800
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 
          -translate-y-1/2
        "
      >
        
        {currentPage === 1 && (
          <>
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto">logo</div>

            <label htmlFor="email">Email</label>
            <Input
              value={formData.email}
              placeholder="email"
              name='email'
              type="email"
              onChange={e => handleFormChange('email', e.target.value)}
            />

            <label htmlFor="name">Names</label>
            <Input
              value={formData.name}
              placeholder="name"
              name='name'
              type="text"
              onChange={e => handleFormChange('name', e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <Input
              value={formData.password}
              placeholder="password"
              name='password'
              type="password"
              onChange={e => handleFormChange('password', e.target.value)}
            />
          </>
        )}

        {currentPage === 2 && (
          <>
            <button
              onClick={handlePreviousPage} 
              className='
                absolute
                top-0
                left-0
               
                h-8
                w-8
                '
            >
              <BsArrowLeftSquareFill size={32} className='text-blue-600 active:text-blue-600 transition'/>
            </button>
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
              <BiSolidUser size={60} className='text-white'/>
              <input
              className="w-24 h-24 bg-gray-200 rounded-full absolute hover:cursor-pointer opacity-0"
              type='file'
              name='profileImage'
              accept='image/*'
              onChange={handleImageChange}
              />
            </span>
          
      

            }

            <label htmlFor="username">Username</label>
              <Input
                value={formData.username}
                placeholder="username"
                name='username'
                type="text"
                onChange={e => handleFormChange('username', e.target.value)}
              />
            <label htmlFor="password">Bio</label>
            <Input
              value={formData.bio}
              placeholder="bio"
              name='bio'
              type="text"
              onChange={e => handleFormChange('password', e.target.value)}
            />
            
          </>
        )}
        <div className='flex gap-2 py-1 mx-auto'>
          <div className={`w-3 h-3 rounded-full ${currentPage === 1 ? 'bg-blue-600' : 'bg-gray-500'} transition`}/>
          <div className={`w-3 h-3 rounded-full ${currentPage === 2 ? 'bg-blue-600' : 'bg-gray-500'} transition`}/>
        </div>
        <Button 
        onClick={handleNextPage} 
        type={currentPage === 2 ? 'submit' : 'button'} 
        disabled={isLoading}>
          {currentPage === totalPages ? 'Create' : 'Next'}
        </Button>
      </form>
  )
}
