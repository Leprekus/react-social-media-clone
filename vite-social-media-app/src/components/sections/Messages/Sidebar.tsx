import { useState, type ReactNode } from 'react'
import { Conversation } from '../../../../typings'
import { BiSearch } from 'react-icons/bi'
import ConversationItem from './ConversationItem'
import Search from '../../../pages/auth/Search';
import Input from '../../ui/Input';


interface SidebarProps { conversations: Conversation[] | null, children: ReactNode }


const ConversationSkeleton = () => {
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

export default function Sidebar({ conversations, children  }: SidebarProps) {

  return (
    
        <div
        className='
            absolute
            top-0
            w-full
            min-h-screen
            sm:w-96
            sm:border-zinc-600
            sm:border-l
            bg-charcoal
            flex
            flex-col
            gap-1
            p-4
            '>
                <div 
                //onClick={}
                
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
                    <Input placeholder='Search username'/>
                </div>
            {!conversations ? //render skeleton
            [0,0,0, 0, 0].map((conversation, i) => <ConversationSkeleton key={i}/>)
            :
            conversations.length < 1 ?
            <p className='text-gray-400 font-semibold text-lg'>Start chatting</p>: //handle no conversations
            conversations.map(conversation => (
                <ConversationItem conversation={conversation}/>
            )) //render conversations
        
            }
        </div>

  )
}
