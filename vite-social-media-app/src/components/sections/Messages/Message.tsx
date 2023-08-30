import React from 'react'
import { ClientMessage } from '../../../../typings'
import { useAuth } from '../../../hooks/useAuth'

interface MessageProps { message: ClientMessage}
export default function Message({ message }: MessageProps) {
    const { session } = useAuth()
    const senderStyle = `
        right-4
        from-violet-950
        to-violet-950/50
        border
        border-violet-800
        `
    const receiverStyle = `
        left-4
        from-blue-950
        to-blue-950/50
        border
        border-blue-800
        `
  return (
    <div className='w-full relative h-10'>
        <div
            className={`
            absolute
            ${message.userId === session?.user.id ? senderStyle : receiverStyle}
            
            bg-gradient-to-br
            py-1
            px-4
            rounded-md
            flex
            items-center
            justify-center
            `}
        >
            <p>{ message.body }</p>
        </div>
    </div>
  )
}
