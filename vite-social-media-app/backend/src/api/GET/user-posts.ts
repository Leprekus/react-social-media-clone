import { type Request, type Response } from 'express'
import { UserPosts } from '../../Tables'
import verifyToken from '../../utils/verifyToken'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
    
    
    const posts = await UserPosts(verifiedUser.username).getAll().run()
    
    if(!posts)
        return res.status(404).json({ message: 'no posts found' })

    const sortedPosts = posts?.sort((a, b) => (b?.created_at || 0) - (a?.created_at || 0))
    return res.status(200).json({ posts: sortedPosts })
  
}