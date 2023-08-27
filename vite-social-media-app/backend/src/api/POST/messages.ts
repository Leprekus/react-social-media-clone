import { type Request, type Response } from 'express'
import { z } from 'zod'
import { v4 as uid } from 'uuid'
import { MessageBucket } from '../../Tables'
import { Conversation, Message } from '../../../../typings'
import verifyToken from '../../utils/verifyToken'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
 
    const { message, conversationId, senderId, receiverId } = req.body

    const MessageSchema = z.object({
        body: z.string(),
        userId: z.string(),
    })
    const result = MessageSchema.safeParse(message)
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })

    const newMessage:Message = {
        ...result.data,
        created_at: Date.now(),
        status: 'delivered',
        id: uid()
    }      

    let messageBucket 

    try {
        messageBucket = await MessageBucket
            .getOne()
            .where('id').equals(conversationId)
            .run()
    

    } catch(error) {
        messageBucket = null
    }


    if(messageBucket) {

        await MessageBucket.updateOne({
            messages: [ newMessage ]
        }).where('id').equals(conversationId)
        .run()

        return res.status(200).json({ message: 'Sent successfully' })
    }
    
    const newConversation: Conversation  = {
        id: uid(),
        users: [ senderId, receiverId ],
        created_at: Date.now(),
        messages: [ newMessage ]
    }
    await MessageBucket.insert(newConversation)

    return res.status(200).json({ message: 'conversation started successfully' })
  
}