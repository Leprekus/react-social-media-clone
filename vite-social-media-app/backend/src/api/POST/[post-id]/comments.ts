import { type Request, type Response } from 'express'
import { CommentBucket } from '../../../Tables'
import { v4 as uid } from 'uuid'
import { IComment } from '../../../../../typings'
import { ICommentBucket } from '../../../../typings'
import verifyToken from '../../../utils/verifyToken'

interface CommentBody {
    comment: IComment
}
export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)
    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })

    const reqSegments = req.path.split('/')
    const postId = reqSegments[reqSegments.length - 2]

    let { comment }:CommentBody = req.body
    
    comment = {
        ...comment,
        id: uid(),
        created_at: Date.now()
    }


    let commentsBucket = null
    try {
        commentsBucket = await CommentBucket.getOne().where('postId').equals(postId).run()
        
    }
    catch(error){
        console.log(error)
        commentsBucket = null
    }

    console.log({ commentsBucket })
    
    if(!commentsBucket)
       await CommentBucket.insert({
                postId,
                comments: [ comment ]
            })
            
    else 
        await CommentBucket.updateOne({
            comments: [ comment ]
        } as ICommentBucket).where('postId').equals(postId).run() 

    return res.status(200).json({ message: 'comment posted successfully' })
  
}