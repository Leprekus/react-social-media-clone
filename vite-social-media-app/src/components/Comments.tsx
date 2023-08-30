import { ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import {  } from 'react-icons/bi'
import { Drawer } from 'vaul'
import { ICommentData } from '../../typings'


import Comment from './ui/Comment'
import ChatInput from './ChatInput'
//import { IPost } from '../../typings'

interface CommentsProps { children : ReactNode, data: ICommentData[] | null, postId: string | null}

interface CommentsTriggerProps { children : ReactNode, }


export const CommentsTrigger = ({ children }: CommentsTriggerProps) => 
              <Drawer.Trigger asChild >
                { children }
              </Drawer.Trigger>





export function Comments({ children, data, postId }: CommentsProps) {

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/POST/${postId}/comments`

  return (
    <Drawer.Root>
        { children }
      <Drawer.Portal className='z-50'>
        <Drawer.Overlay className='fixed inset-0 bg-black/40'/>
        <Drawer.Content className=' 
        z-50
        flex 
        flex-col 
        rounded-t-[10px] 
        h-[96%] mt-24 
        fixed 
        bottom-0 
        left-0 
        right-0
       
        sm:left-[25%]
        md:left-[50%]'>
          <div className='p-4 bg-midnight rounded-t-[10px] flex-1 text-white'>
            <div className='
            mx-auto 
            w-12 h-1.5 
            flex-shrink-0 
            rounded-full
            bg-zinc-400 
            mb-8 
            active:bg-zinc-600 
            transition
            sm:w-full
            sm:h-20
            sm:bg-transparent
            sm:active:bg-transparent
            sm:flex
            sm:justify-end
            ' >
              <Drawer.Close
                className='
                hidden 
                h-10
                w-10
                bg-neutral-700
               hover:bg-neutral-800
              
                rounded-md 
                transition

                sm:flex
                sm:justify-center
                sm:items-center
                '
              >
                <IoIosClose size={40} className='text-gray-400'/>
              </Drawer.Close>
            </div>
            <div className='max-w-md mx-auto'>
              <Drawer.Title className='font-medium mb-4'>
                Comment Section
              </Drawer.Title>
              <div className='flex flex-col gap-2'>
                {data && data?.length > 0 ?
                 data.map((child) => <Comment key={child.comment.id} data={child}/>)  :
                 <p className='text-gray-400 font-semibold mx-auto w-fit'>No Comments yet</p>
                            }
              </div>
            </div>
          </div>
          {postId && <ChatInput endpoint={endpoint}/> }
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

