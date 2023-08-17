import { ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'
interface BoxProps {
    children: ReactNode
    className?: string
    onClick: () => void
}
export default function Box({ children, onClick, className }: BoxProps) {
  
  return (
    <div className='
    backdrop-blur-lg 
    absolute 
    min-h-screen 
    min-w-full 
    top-0 
    left-0 
    z-50
    bg-black/30
    overflow-y-hidden
    '>
        <div className={twMerge(`
          w-[400px]
          min-h-[500px]
          mx-auto
          text-white
          bg-neutral-900
          rounded-md

          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        `, className)}>
          <button onClick={onClick} className='absolute right-1 top-1 hover:bg-neutral-800 rounded-md transition'>
            <IoIosClose className='text-gray-400' size={40}/>
          </button>
          { children }
        </div>
    </div>
  )
}
