import { type Request, type Response } from 'express'
import { z } from 'zod'
import { v4 as uid } from 'uuid'
import { MessageBucket } from '../../Tables'
import verifyToken from '../../utils/verifyToken'
import { BackendMessage } from '../../../typings'
import { parseCookie } from '../../utils/helpers'
import { Session } from '../../../../typings'

export default async function handler(req: Request, res: Response) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)

    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
 
    const conversationId = req.query.conversationId 
    const type = req.query.type as 'Text' | 'Post'
    const { body } = req.body
    const MessageSchema = z.object({
        body: z.string()
    })
  
    const result = MessageSchema.safeParse({ body })
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })

    let conversation 

    try {
        conversation = await MessageBucket
            .getOne()
            .where('id')
            .equals(conversationId)
            .run()

    } catch(error) {
        conversation = null
    }


    if(!conversation)
        return res.status(404).json({ message: 'Conversation not found' })

    const session = JSON.parse(parseCookie(req.headers.cookie)) as Session

    const newMessage:BackendMessage = {
        userId: session.user.id,
        body: result.data.body,
        created_at: Date.now(),
        status: 'delivered',
        id: uid(),
        type
    }

    await MessageBucket.updateOne({
        messages: [ newMessage ],

    })
    .where('id').equals(conversationId)
    .run()
    
    return res.status(200).json({ comment: newMessage })
  
}