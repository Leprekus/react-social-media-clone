import React, { ReactNode } from 'react'

interface NavbarProps { children: ReactNode }
export default function Navbar({ children }: NavbarProps) {
  return (
    <div>
        <aside className='hidden md:block'>
            <p>profile</p>
            <p>home</p>
            <p>search</p>
            <p>messages</p>
        </aside>
        <nav className='
        md:hidden 
        fixed
        top-0 
        z-10 
        bg-black 
        border-b 
        border-gray-700 
        h-11 
        w-full'>
            <p>messages</p>
        </nav>
        { children }
        <nav className='
        md:hidden 
        fixed
        bottom-0 
        bg-black 
         border-t
         border-gray-
         700 h-11 
         w-full
         flex 
         '
         >
            <p>profile</p>
            <p>search</p>
            <p>home</p>
        </nav>
    </div>
  )
}
