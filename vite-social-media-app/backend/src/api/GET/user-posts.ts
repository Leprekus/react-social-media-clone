import { type Request, type Response } from 'express'
import verifyToken from '../../utils/verifyToken'
import { PostsBucket } from '../../Tables'
import { sort } from '../../utils/post-helpers'
import { IPost } from '../../../../typings'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
    
    const posts = await PostsBucket.getAll().where('author').equals(verifiedUser.username).run()
    
    if(!posts)
        return res.status(200).json({ posts: [] })

    const sortedPosts = sort(posts as IPost[])
    return res.status(200).json({ posts: sortedPosts })
  
}