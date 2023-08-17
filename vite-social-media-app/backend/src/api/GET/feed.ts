import { type Request, type Response } from 'express'
import { PostsBucket } from '../../Tables'
import { sort } from '../../utils/post-helpers'
import { IPost } from '../../../../typings'

export default async function handler(req: Request, res: Response) {

    const data = 
        await PostsBucket
            .getAll().run()
    
    const posts = sort(data as IPost[])
    
    if(!posts)
        return res.status(404).json({ posts: [] })

    return res.status(200).json({ posts })
       
}