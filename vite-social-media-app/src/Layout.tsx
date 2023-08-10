import { ReactNode } from 'react'
import Navbar from './components/Navbar'

interface LayoutProps { children: ReactNode }
export default function Layout({ children }: LayoutProps) {
  return (
    <main className='min-w-full min-h-screen max-w-7xl mx-auto bg-black text-white'>
      <Navbar>
        { children }
      </Navbar>
    </main>
  )
}
