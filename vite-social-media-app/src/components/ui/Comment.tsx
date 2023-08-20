import { useEffect, useRef, useState } from 'react'
import { ICommentData } from '../../../typings'
import LikedButton from './LikedButton'
import Button from './Button'
import Link from '../Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface CommentProps { data: ICommentData }
export default function Comment({ data: { comment, postId } }: CommentProps) {
 console.log(comment)

    const bodyRef = useRef<HTMLParagraphElement | null>(null)
    const [displayMore, setDisplayMore] = useState(false)
    const [isClamped, setIsClamped] = useState(false)

    useEffect(() => {
        if(bodyRef.current) {
            const isClamped = bodyRef.current.clientHeight < bodyRef.current.scrollHeight
            
            setIsClamped(isClamped)
        }

    },[bodyRef.current])

    const queryString = new URLSearchParams({
        id: postId as string,
        commentId: comment.id,
    })
  return (
    <div className='
        pt-4
        pb-2
        px-4
        bg-zinc-800
        rounded-md
        flex 
        justify-between
        gap-4
        min-h-[80px]
        h-fit
        items-start
        text-sm
        md:text-base
        relative

    '>
        <Link 
            href={`/${comment.author}`}
            className='w-1/4 hover:text-zinc-400 font-semibold transition'>
                {comment.author}
        </Link>
        <div className='flex flex-col gap-4 max-w-[60%] '>
            <p 
            className={`${displayMore ? 'h-fit' : 'line-clamp-2'} text-neutral-200`} 
            ref={bodyRef}>
               { comment.body}
            </p>
            <span className='
                text-xs
                text-gray-400 
                absolute 
                bottom-4
                right-4
                '
            >{
             dayjs(comment.created_at).fromNow() }
             </span>
            {isClamped && 
            <Button 
            className='
                w-fit
                py-1
                px-2
                bg-gray-600/40
                transition
                hover:bg-gray-600/20
                active:bg-gray-600/10
                border-none
                mx-auto
                text-xs
                sm:text-sm
            '
            onClick={() => setDisplayMore(!displayMore)}>
                { displayMore ? 'Show Less' : 'Show More'}
            </Button> 

            }
        </div>
        <LikedButton
            queryString={queryString}
            likes={comment.likes}
        />
    </div>
  )
}
