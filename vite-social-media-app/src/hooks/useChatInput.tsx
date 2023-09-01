import { ChangeEvent, useState } from 'react'
import { BiPaperPlane } from 'react-icons/bi'
import { useAuth } from './useAuth'
import { tryCatchPost } from '../lib/fetch-helpers'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'

//interface CommentsFooterProps { endpoint: string, className?: string, method?: 'POST' | 'PUT' }

// export default function ChatInput <T>({ endpoint, className, method='POST' }: CommentsFooterProps) {
//     const { session } = useAuth()
//     const [isDisabled, setIsDisabled] = useState(true)
//     const [body, setBody] = useState('') 
  
//     const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
  
//       e.currentTarget.value.length > 0 ? setIsDisabled(false) : setIsDisabled(true)
  
//       setBody(e.target.value)
//     }
  
//     const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  
//       e.preventDefault()
  
//       if(!endpoint) return toast.error('No post selected')
  
//         const [data, error] = await tryCatchPost<T>({ 
//           endpoint, 
//           method,
//           token: session?.accessToken, 
//           payload: { body }
//         })
  
//         if(error || !data?.res.ok) toast.error('Could not post comment')
        
//         if(data?.res.ok) {
//           setBody('')
//           toast.success('Comment Posted')
//         }
  
//     }
//     return (
//       <div className={twMerge(`p-4 bg-[#262930] border-t border-charcoal mt-auto`, className)}>
//         <div className='flex gap-6 items-end justify-end max-w-md mx-auto text-lg pb-2'
//         >
//           <Textarea 
//           onChange={handleChange}
//           placeholder='Comment' 
//           className={`resize-none rounded-[20px]  max-h-[60vh] sm:rounded-md sm:h-14 sm:pt-5`}/>
//           <Button 
//           disabled={isDisabled}
//           onClick={handleSubmit}
//           className={`${isDisabled ? 'bg-neutral-700 active:bg-neutral-700 border-transparent' : 'text-white'} w-fit `}>
//             <BiPaperPlane size={30} className={isDisabled ? 'text-gray-400' : 'text-white'}/>
//           </Button>
//         </div>
//       </div>
//   )}


interface ChatInputProps { 
  endpoint: string, 
  className?: string,
  method?: 'POST' | 'PUT', 
  onSubmitHandler?: (item: any) => void;  
}

const useChatInput = <T, >(initialItems: T) => {

  const [items, setItems] = useState<T>(initialItems)
  
  const ChatInput = ({ endpoint, className, method = 'POST', onSubmitHandler }: ChatInputProps) => {
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
      
            const [data, error] = await tryCatchPost<{[key: string]: any}>({ 
              endpoint, 
              method,
              token: session?.accessToken, 
              payload: { body }
            })
      
            if(error || !data?.res.ok) toast.error('Could not post comment')
            
            if(data?.res.ok && data.json) {
              setBody('')
              const [ key ] = Object.keys(data.json)
              
              onSubmitHandler && onSubmitHandler(data.json[key])
              setItems(prev => {
                if(Array.isArray(prev))
                  return [ ...prev, data.json![key] ]

                else return data.json![key]
              })
              toast.success('Comment Posted')
              
            }
      
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
        )
  }
  return {
    ChatInput, 
    items,
    setItems
  }
}

export default useChatInput