import { ReactNode, useState } from 'react'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { HiUser, HiOutlineUser } from 'react-icons/hi'
import { BiSolidSearch, BiSearch } from 'react-icons/bi'
import { TbMessageCircle2Filled, TbMessageCircle2 } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
import { HiMenuAlt4 } from 'react-icons/hi'
import { useRouter } from '../hooks/useRouter'
import routes from '../lib/routes'
import Link from './Link'
interface NavbarProps { children: ReactNode }
export default function Navbar({ children }: NavbarProps) {

  const pathname = useRouter().pathname
  const [ home, login, search, messages, user ] = routes
  const [isOpen, setIsOpen] = useState(false)

  const isUserActive = pathname === user.path
  const isSearchActive = pathname === search.path
  const isHomeActive = pathname === home.path
  const isMessagesActive = pathname === messages.path
  

  const Home = isHomeActive ? AiFillHome : AiOutlineHome
  const User = isUserActive ? HiUser : HiOutlineUser
  const Search = isSearchActive ? BiSolidSearch : BiSearch
  const Message = isMessagesActive ? TbMessageCircle2Filled : TbMessageCircle2
  const HamburgerMenu = isOpen ? IoIosClose : HiMenuAlt4

  const activeClassName = 'text-violet-400 bg-violet-400/30'
  const linkClassName = `
  flex 
  flex-col 
  justify-center
  gap-2 
  items-center  
  font-semibold 
  tracking-wide 
  text-sm
  w-20
  h-20
  rounded-md
  transition
  hover:bg-gray-500/20

  sm:flex-row
  sm:w-full
  sm:justify-start
  sm:pl-8
  ${!isOpen && 'sm:w-20'}
  `

  return (
    <>
        { children }
        <nav className={`
        fixed
        bottom-0 
        left-0
        bg-[#1d1f25]  
        h-15 
        w-full
        flex
        justify-evenly
        p-4 

        sm:flex-col
        sm:top-0
        ${ isOpen ? 'sm:w-72' :'sm:w-20 sm:overflow-hidden'}
        sm:
        sm:justify-start 
        sm:gap-4
        sm:pt-14
        
         `}
         >
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='
            hidden 
            transition
            hover:bg-violet-400/30 
            w-8 
            h-8 
            items-center
            justify-center
            rounded-md
            absolute
            right-4
            top-4
            sm:flex
       '>
          <HamburgerMenu size={40} className='text-violet-400'/>
        </button>
            <Link 
            className={`
            ${linkClassName} 
            ${isHomeActive && activeClassName}`}
            href={home.path}>
              <Home 
              size={24}
              />
              <span  className={isOpen ? 'visible' : 'hidden'}>home</span>
            </Link>
            <Link 
            className={`
            ${linkClassName} 
            ${isSearchActive && activeClassName}`}
            href={search.path}>
              <Search 
              size={24}
              />
              <span  className={isOpen ? 'visible' : 'hidden'}>search</span>
            </Link>
            <Link 
            className={`
            ${linkClassName} 
            ${isMessagesActive && activeClassName}`}
            href={messages.path}>
              <Message 
              size={24}
              />
              <span  className={isOpen ? 'visible' : 'hidden'}>messages</span>
            </Link>
            <Link 
            className={`
            ${linkClassName} 
            ${isUserActive && activeClassName}`}
            href={user.path}>
              <User 
              size={24}
              />
              <span className={isOpen ? 'visible' : 'hidden'}>profile</span>
            </Link>
        </nav>
    </>
  )
}
