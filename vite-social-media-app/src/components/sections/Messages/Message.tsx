import React from 'react'
import { ClientMessage } from '../../../../typings'
import { useAuth } from '../../../hooks/useAuth'

interface MessageProps { message: ClientMessage}
export default function Message({ message }: MessageProps) {
    const { session } = useAuth()
  return (
    <div className='w-full relative h-10'>
        <div
            className={`
            absolute
            ${message.userId === session?.user.id ? 'right-0' : 'left-0'}
            `}
        >
            { message.body }
        </div>
    </div>
  )
}
