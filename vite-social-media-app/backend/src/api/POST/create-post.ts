import { type Request, type Response } from 'express'
import { z } from 'zod'
import { v4 as uid } from 'uuid'
import { UserPosts } from '../../Tables'
import { IPost } from '../../../../typings'
import verifyToken from '../../utils/verifyToken'



export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
 
    const post = req.body

    const PostSchema = z.object({
        comment_count: z.number(),
        like_count: z.number(),
        likes: z.array(z.string()),
        comments: z.array(z.string()),
        image: z.array(z.string()),
        id: z.string(),
        description: z.string(),
        author: z.string(),
        author_image: z.string(),

    })
    const result = PostSchema.safeParse(post)
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })
    
    //const binaryData = result.data.image.map(img => atob(img))
    //TODO: turn images to binary to reduce space
    const newPost:IPost = {
        ...result.data,
        created_at: Date.now(),
        //image: binaryData,
        id: uid()
    }      
    
    await UserPosts(verifiedUser.username).insert(newPost)
    
    return res.status(200).json({ message: 'account created successfully' })
  
}