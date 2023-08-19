import { ChangeEvent , ReactNode, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { BiPaperPlane } from 'react-icons/bi'
import { Drawer } from 'vaul'
import { IComment } from '../../typings'

import Textarea from './ui/Textarea'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'
import { tryCatchPost } from '../lib/fetch-helpers'
import toast from 'react-hot-toast'
//import { IPost } from '../../typings'

interface CommentsProps { children : ReactNode, comments: IComment[] | null, postId: string }
interface CommentsFooterProps { children : ReactNode, comments: IComment[] | null, postId: string }
interface CommentsTriggerProps { children : ReactNode, }
interface CommentData { comments: IComment[] }

export const CommentsTrigger = ({ children }: CommentsTriggerProps) => 
              <Drawer.Trigger asChild >
                { children }
              </Drawer.Trigger>


const Footer = ({ postId }: CommentsFooterProps) => {
  const { session } = useAuth()
  const [isDisabled, setIsDisabled] = useState(true)
  const [comment, setComment] = useState('')

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value,e.currentTarget.value.length,  isDisabled)
    e.currentTarget.value.length > 0 ? setIsDisabled(false) : setIsDisabled(true)
    setComment(e.currentTarget.value)
  }

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  
      const [data, error] = await tryCatchPost<CommentData>({ 
        endpoint: `${import.meta.env.VITE_BACKEND_URL}${postId}/`, 
        token: session?.accessToken, 
        payload: { body: comment }
      })
      if(error || !data?.res.ok) toast.error('Could not post comment')
      
      toast.success('Comment Posted')

  }
  return (
    <div className='p-4 bg-[#262930] border-t border-[#1e2028] mt-auto'>
      <div className='flex gap-6 items-end justify-end max-w-md mx-auto text-lg pb-2'
      >
        <Textarea 
        onChange={handleChange}
        placeholder='Comment' 
        className={`resize-none rounded-[20px]  max-h-[60vh] sm:rounded-md sm:h-14 sm:pt-5`}/>
        <Button 
        disabled={isDisabled}
        onClick={handleSubmit}
        className={`${isDisabled ? 'bg-neutral-700 active:bg-neutral-700 border-transparent' : 'text-white'} w-fit `}>
          <BiPaperPlane size={30} className={isDisabled ? 'text-gray-400' : 'text-white'}/>
        </Button>
      </div>
    </div>
)}

export function Comments({ children, comments, postId }: CommentsProps) {
  
  console.log(comments)
  return (
    <Drawer.Root defaultOpen>
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
              {comments && comments?.length > 0 ?
               comments.map(comment => <div>comment</div>)  :
               <p className='text-gray-400 font-semibold mx-auto w-fit'>No Comments yet</p>
            }
            </div>
          </div>
          <Footer postId={postId}/>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

