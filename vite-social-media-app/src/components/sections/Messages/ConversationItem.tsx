
import React from 'react'
import { Conversation } from '../../../../typings'

interface ConversationProps { conversation: Conversation }
export default function ConversationItem({ conversation }: ConversationProps) {
  return (
    <div>{conversation.created_at}</div>
  )
}
