import { type Request, type Response } from 'express'
import { CommentBucket } from '../../../Tables'


export default async function handler(req: Request, res: Response) {

    const id = req.query.id
    
    let post = null
    try {
        post = await CommentBucket.getOne().where('id').equals(id).run()
    }
    catch(error){
        console.log(error)
        post = null
    }   
    
    if(!post)
        return res.status(200).json({ posts: [] })

    return res.status(200).json({ post })
  
}