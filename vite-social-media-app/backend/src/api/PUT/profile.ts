import { type Request, type Response } from 'express'
import { z } from 'zod'
import { UserProfileImage, UserTable } from '../../Tables'
import verifyToken from '../../utils/verifyToken'
import { updateSession } from '../../utils/session-helpers'
import { config } from 'dotenv'
config()


export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
 
    const userPayload = req.body

    const UserSchema = z.object({
        email: z.string(),
        name: z.string(),
        username: z.string(),
        bio: z.string(),
        profileImage: z.string(),
        id: z.string()
    })
    const result = UserSchema.safeParse(userPayload)
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })
    
       

    let updatedUser 
    let userProfileImage

    try {
        updatedUser = await UserTable
            .updateOne({
                ...result.data,
                profileImage: (new URL(`${process.env.BACKEND_URL}api/GET/profile/picture?userId=${result.data.username}`)).toString(),
            }).where('username')
            .equals(result.data.username).run()
        
            userProfileImage = await UserProfileImage
            .updateOne({
                image: result.data.profileImage,
            }).where('username')
            .equals(result.data.username).run()

    } catch(error) {
        updatedUser = null
    }


    if(!updatedUser || !userProfileImage)
        return res.status(409).json({ message: 'Failed to update values' })
    

    await updateSession(updatedUser, req,res)

    return res.status(200).json({ user: updatedUser })
  
}