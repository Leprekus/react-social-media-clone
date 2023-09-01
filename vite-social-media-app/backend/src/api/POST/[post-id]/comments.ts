import { type Request, type Response } from 'express'
import { CommentBucket, PostsBucket } from '../../../Tables'
import { v4 as uid } from 'uuid'
import { IComment } from '../../../../../typings'
import verifyToken from '../../../utils/verifyToken'
import { parseCookie } from '../../../utils/helpers'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)
    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })

    const reqSegments = req.path.split('/')
    const postId = reqSegments[reqSegments.length - 2]

    const { body } = req.body
    const session = JSON.parse(parseCookie(req.headers.cookie))

    const comment: IComment = {
        id: uid(),
        author: session?.user.username as string,
        body: body,
        created_at: Date.now(),
        likes: [],
        like_count: 0,
        replies: [],
    }


    let commentsBucket = null
    try {
        commentsBucket = await CommentBucket.getOne().where('comment.id').equals(comment.id).run()
        
    }
    catch(error){
        console.log(error)
        commentsBucket = null
    }
    
    if(commentsBucket)
       return res.status(409).json({ message: 'Duplicate record' })
            
    await CommentBucket.insert({
        postId,
        comment
    })
    const commentCount = (await PostsBucket.getOne().where('id').equals(postId).run())?.comment_count
    await PostsBucket.updateOne({
        comment_count: (commentCount  || 0) + 1,
        comments: [ comment.id ]
    }).where('id').equals(postId).run()

    return res.status(200).json({ comment: { postId, comment } })
  
}