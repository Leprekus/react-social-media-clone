import { type ReactNode } from 'react'
import { Chat } from '../../../../typings'
import { BiSearch } from 'react-icons/bi'
import ConversationItem from './ChatItem'
import Input from '../../ui/Input';
import useSearchModal from '../../../hooks/useSearchModal';


interface SidebarProps { chats: Chat[] | null, children: ReactNode }


const ChatsSkeleton = () => {
    return (
      <div className="flex items-center p-4 bg-gray-600/50 rounded-md animate-pulse">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 animate-pulse"></div>
        
        <div className="flex-grow">
          {/* User name placeholder */}
          <div className="w-3/4 h-4 bg-gray-300 mb-2 animate-pulse rounded-md"></div>
          
          {/* Last message placeholder */}
          <div className="w-full h-3 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  };

export default function Sidebar({ chats, children  }: SidebarProps) {

    const searchModal = useSearchModal()
    const handleClick = () => {
        if(!searchModal.isOpen) {
            searchModal.Open()
        }
    }
  return (
    
      <div className='absolute top-0 w-full sm:flex'>
        <div
        className='
            w-full
            min-h-screen
            sm:w-20
            md:w-96
            sm:border-zinc-600
            sm:border-l
            bg-charcoal
            flex
            flex-col
            gap-1
            p-4
            '>
                <div 
                onClick={handleClick}
                
                className='flex items-center justify-center gap-4'>
                    <button
                    className='
                    h-12
                    w-12
                    bg-neutral-700
                    hover:bg-neutral-800
                    active:bg-neutral-800/70
                    rounded-md
                    transition
                    flex
                    justify-center
                    items-center
                    '
                    >
                    <BiSearch size={30} className='text-gray-400'/>
                    </button>
                    <Input placeholder='Search username' className='sm:hidden md:block'/>
                </div>
            {!chats ? //render skeleton
            [0,0,0, 0, 0].map((chat, i) => <ChatsSkeleton key={`${chat}-${i}`}/>)
            :
            chats.length < 1 ?
            <p className='text-gray-400 font-semibold text-lg sm:hidden md:block'>Start chatting</p>: //handle no conversations
            chats.map(chat => (
                <ConversationItem chat={chat}/>
            )) //render conversations
        
            }
        </div>
          { children }
        </div>
  )
}
