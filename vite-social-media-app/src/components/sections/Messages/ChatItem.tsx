
import { Chat } from '../../../../typings'

interface ChatProps { chat: Chat }
export default function ConversationItem({ chat }: ChatProps) {
  return (
    <div>{chat.created_at}</div>
  )
}
