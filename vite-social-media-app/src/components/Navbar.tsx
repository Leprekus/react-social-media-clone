import React, { ReactNode } from 'react'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { HiUser, HiOutlineUser } from 'react-icons/hi'
import { BiSolidSearch, BiSearch } from 'react-icons/bi'
import { TbMessageCircle2Filled, TbMessageCircle2 } from 'react-icons/tb'
interface NavbarProps { children: ReactNode }
export default function Navbar({ children }: NavbarProps) {

  const Home = AiFillHome || AiOutlineHome
  const User = HiUser || HiOutlineUser
  const Search = BiSolidSearch || BiSearch
  const Message = TbMessageCircle2Filled || TbMessageCircle2
  return (
    <div>
        <aside className='hidden md:block'>
            <p>profile</p>
            <p>home</p>
            <p>search</p>
            <p>messages</p>
        </aside>
        { children }
        <nav className='
        md:hidden 
        fixed
        bottom-0 
        bg-[#1d1f25]  
         h-12 
         w-full
         flex 
         '
         >
            <div>
              <User/>
              <span className='text-xs '>profile</span>
              </div>

            <div>
              <Search/>
              <span className='text-xs '>search</span>
              </div>
            <div>
              <Home/>
              <span className='text-xs '>home</span>
              </div>
            <div>
              <Message/>
              <span className='text-xs '>messages</span>
              </div>
        </nav>
    </div>
  )
}
