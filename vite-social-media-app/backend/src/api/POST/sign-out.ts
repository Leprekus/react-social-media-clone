import { type Request, type Response } from 'express'
import { config } from 'dotenv'
import { SessionTable } from '../../Tables'
import verifyToken from '../../utils/verifyToken'
import { z } from 'zod'

config()

export default async function handler(req: Request, res: Response) {
    
    const accessToken = req.headers.authorization?.split(' ')[1]
    const verifiedUser = await verifyToken(accessToken)
    
    if(!verifiedUser) return res.status(401).json({ message: 'failed to verify user' })
    
    const { userId, createdAt } = req.body
    const SessionSchema = z.object({
        userId: z.string(),
        createdAt: z.number()
    })

    const result = SessionSchema.safeParse({ userId, createdAt })

    if(!result.success) return res.status(422).json({ message: 'Failed to verify data'})
    
    console.log('ran 1')
    const session = await SessionTable.deleteOne()
    .where('createdAt').equals(createdAt)
    .where('user.id').equals(userId)
    .run()

    console.log('ran 0', session, { createdAt })
    if(!session)
        return res.status(404).json({ message: 'could not find session'})

    res.cookie('session', null)
    return res.status(200).json({ message: 'signed out successfully' })
    
}