import { type Request, type Response } from 'express'
import { MessageBucket } from '../../Tables'
import verifyToken from '../../utils/verifyToken'
import { getUser } from '../../utils/helpers'
import { Chat } from '../../../../typings'


export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
    
    const userId = req.query.userId

    let chats 

    try {
        chats = await MessageBucket
            .getAll()
            .where('userIds').in(userId as string[])
            .run()
    

    } catch(error) {
        chats = null
    }
    
    const chatsWithUsers = await Promise.all(
        chats?.map(async (chat) => ({
            ...chat,
            users: [
                await getUser(chat?.userIds[0] as string),
                await getUser(chat?.userIds[1] as string),
            ]
            
        } as Chat)) || []
    )
    
    return res.status(200).json({ chats: chatsWithUsers || [] })
  
}