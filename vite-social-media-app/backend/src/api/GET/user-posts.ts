import { type Request, type Response } from 'express'
import { PostsBucket } from '../../Tables'
import { sort } from '../../utils/helpers'
import { IPost } from '../../../../typings'

export default async function handler(req: Request, res: Response) {

    const username = req.query.username
    
    const posts = await PostsBucket.getAll().where('author').equals(username).run()
    
    if(!posts)
        return res.status(200).json({ posts: [] })

    const sortedPosts = sort(posts as IPost[])
    return res.status(200).json({ posts: sortedPosts })
  
}