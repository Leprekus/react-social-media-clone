import React from 'react'
import { IComment } from '../../../typings'
import LikedButton from './LikedButton'

interface CommentProps { data: IComment }
export default function Comment({ data }: CommentProps) {
    console.log(data)
  return (
    <div>
        <p>{data.author}</p>
        <p>{data.body}</p>
        <LikedButton
            postId={data.id}
            likes={data.likes}
        />
    </div>
  )
}
