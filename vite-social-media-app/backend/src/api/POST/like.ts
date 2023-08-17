import { type Request, type Response } from 'express'
import { z } from 'zod'
//import { v4 as uid } from 'uuid'
import { config } from 'dotenv'
import verifyToken from '../../utils/verifyToken'
import { PostsBucket } from '../../Tables'

config()

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)
    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })


    const id = req.query.id
    const { like, username } = req.body

    const Like = z.object({
        like: z.boolean(),
        username: z.string()
    })

    const result = Like.safeParse({like, username})
    if(!result.success)
        return res.status(422).json({ error: 'validation failed' })

    const post = await PostsBucket.getOne().where('id').equals(id).run()
    if(!result.data.like) { //remove like
      
        const likeCount = (post?.like_count || 1)  - 1
 
        await PostsBucket.updateOne({
            like_count: likeCount
        }).where('id').equals(id).run()
        
        //takes data in to be filtered
        await PostsBucket.filterOne({
            likes: [verifiedUser.username]
        }).where('id').equals(id).run()
        
    } else { //like post
        const match = post?.likes?.find(user => user === result.data.username)
        if(!match){
            const updatedLikes = post?.likes
            post?.likes?.push(result.data.username)
            const likeCount = (post?.like_count || 0)  + 1
     
            console.log({ updatedLikes }, 'ponido')
            await PostsBucket.updateOne({
                likes: updatedLikes,
                like_count: likeCount
            })
            .where('id').equals(id).run()
        }

    }

    return res.status(200).json({ message: 'like processed successfully' })
}