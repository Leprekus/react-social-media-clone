import { type Request, type Response } from 'express'
import { MessageBucket } from '../../Tables'
import verifyToken from '../../utils/verifyToken'


export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
    
    const userId = req.query.userId

    let chats 

    try {
        chats = await MessageBucket
            .getAll()
            .where('users').in([ userId as string ])
            .run()
    

    } catch(error) {
        chats = null
    }

    

    return res.status(200).json({ chats: chats || [] })
  
}