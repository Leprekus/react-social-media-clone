import { type Request, type Response } from 'express'
import { z } from 'zod'
import { v4 as uid } from 'uuid'
import { MessageBucket } from '../../Tables'
import verifyToken from '../../utils/verifyToken'
import { BackendConversation } from '../../../typings'
import { Conversation } from '../../../../typings'
import { getUser } from '../../utils/helpers'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
 
    const { senderId, receiverId } = req.body

    const MessageSchema = z.object({
        receiverId: z.string(),
        senderId: z.string(),
    })
    const result = MessageSchema.safeParse({ senderId, receiverId })
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })

    let messageBucket 

    try {
        messageBucket = await MessageBucket
            .getOne()
            .where('userIds')
            .includesAll([ result.data.senderId, result.data.receiverId ])
            .run()


    } catch(error) {
        messageBucket = null
    }

    const sender = await getUser(result.data.senderId)
    const receiver = await getUser(result.data.receiverId)

    if(messageBucket) {
        const retrievedConversation = {
            ...messageBucket,
            users: [ sender, receiver ]
        } as Conversation
        return res.status(200).json({ conversation: retrievedConversation })
    } 
    
    
    const newConversation: BackendConversation  = {
        id: uid(),
        userIds: [ senderId, receiverId ],
        created_at: Date.now(),
        messages: []
    }

    await MessageBucket.insert(newConversation)

    
    const clientConvesation: Conversation = {
        ...newConversation,
        users: [ sender, receiver]
    }

    return res.status(200).json({ conversation: clientConvesation })
  
}