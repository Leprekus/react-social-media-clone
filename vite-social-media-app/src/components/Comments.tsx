import { ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import { Drawer } from 'vaul'
import { IComment } from '../../typings'
//import { IPost } from '../../typings'

interface CommentsProps { children : ReactNode, comments: IComment[] | null }
interface CommentsTriggerProps { children : ReactNode, }

export const CommentsTrigger = ({ children }: CommentsTriggerProps) => 
              <Drawer.Trigger asChild >
                { children }
              </Drawer.Trigger>


const Footer = () => <div className='p-4 bg-[#262930] border-t border-[#1e2028] mt-auto'>
<div className='flex gap-6 justify-end max-w-md mx-auto'>
  <a
    className='text-xs text-zinc-600 flex items-center gap-0.25'
    href='https://github.com/emilkowalski/vaul'
    target='_blank'
  >
    GitHub
    <svg
      fill='none'
      height='16'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='16'
      aria-hidden='true'
      className='w-3 h-3 ml-1'
    >
      <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
      <path d='M15 3h6v6'></path>
      <path d='M10 14L21 3'></path>
    </svg>
  </a>
  <a
    className='text-xs text-zinc-600 flex items-center gap-0.25'
    href='https://twitter.com/emilkowalski_'
    target='_blank'
  >
    Twitter
    <svg
      fill='none'
      height='16'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='16'
      aria-hidden='true'
      className='w-3 h-3 ml-1'
    >
      <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
      <path d='M15 3h6v6'></path>
      <path d='M10 14L21 3'></path>
    </svg>
  </a>
</div>
</div>

export function Comments({ children, comments }: CommentsProps) {
  
  console.log(comments)
  return (
    <Drawer.Root>
        { children }
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40'/>
        <Drawer.Content className='
        //bg-zinc-100 
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
              <Drawer.Close>
                <button className='
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
                '><IoIosClose size={40} className='text-gray-400'/></button>
              </Drawer.Close>
            </div>
            <div className='max-w-md mx-auto'>
              <Drawer.Title className='font-medium mb-4'>
                Unstyled drawer for React.
              </Drawer.Title>
              
            </div>
          </div>
          <Footer/>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

