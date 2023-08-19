import { type Request, type Response } from 'express'
import { CommentBucket } from '../../../Tables'


export default async function handler(req: Request, res: Response) {

    const reqSegments = req.path.split('/')
    const postId = reqSegments[reqSegments.length - 2]
    
    let comments = null
    try {
        comments = await CommentBucket.getOne().where(`postId`).equals(postId).run()
    }
    catch(error){
        console.log(error)
        comments = null
    }  
    
    console.log({ comments })
    if(!comments)
        return res.status(200).json({ commentss: [] })

    return res.status(200).json({ comments })
  
}