import { ReactNode } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'
interface BoxProps {
    children: ReactNode
    className?: string
    onClick: () => void
}
export default function Box({ children, onClick, className }: BoxProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    onClick && onClick()
    
  }
  return (
    <div className='
    backdrop-blur-lg 
    fixed 
    min-h-screen 
    min-w-full 
    top-0 
    left-0 
    z-50
    bg-black/30
    overflow-hidden
    '>
        <div className={twMerge(`
          sm:w-[400px]
          sm:h-[500px]
          mx-auto
          text-white
          bg-neutral-900
          sm:rounded-md
          overflow-hidden

          h-screen
          w-screen

          flex flex-col gap-8

          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        `, className)}>
          <div className='p-4 relative h-10'>
            <button onClick={handleClick} className=' 
            sm:absolute 
            sm:right-2
            hover:bg-neutral-800 
            rounded-md 
            transition 
            z-50'>
              <BsArrowLeftShort size={40} className='text-gray-400 sm:hidden'/>
              <IoIosClose className='text-gray-400 hidden sm:block' size={40}/>
            </button>
          </div>
          <div>
            { children }
          </div>
        </div>
    </div>
  )
}
