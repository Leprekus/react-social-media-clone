import { ChangeEvent, useState } from 'react'
import { BiPaperPlane } from 'react-icons/bi'
import { IComment } from '../../typings'
import Textarea from './ui/Textarea'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'
import { tryCatchPost } from '../lib/fetch-helpers'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

interface CommentsFooterProps { endpoint: string, className?: string }
interface CommentData { comments: IComment[] }
export default function ChatInput ({ endpoint, className }: CommentsFooterProps) {
    const { session } = useAuth()
    const [isDisabled, setIsDisabled] = useState(true)
    const [body, setBody] = useState('') 
  
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
  
      e.currentTarget.value.length > 0 ? setIsDisabled(false) : setIsDisabled(true)
  
      setBody(e.target.value)
    }
  
    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  
      e.preventDefault()
  
      if(!endpoint) return toast.error('No post selected')
  
      const comment:IComment = {
        id: '',
        author: session?.user.username as string,
        body: body,
        created_at: 0,
        likes: [],
        like_count: 0,
        replies: [],
      }
    
        const [data, error] = await tryCatchPost<CommentData>({ 
          endpoint, 
          token: session?.accessToken, 
          payload: { comment }
        })
  
        if(error || !data?.res.ok) toast.error('Could not post comment')
        
        if(data?.res.ok) toast.success('Comment Posted')
  
    }
    return (
      <div className={twMerge(`p-4 bg-[#262930] border-t border-charcoal mt-auto`, className)}>
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