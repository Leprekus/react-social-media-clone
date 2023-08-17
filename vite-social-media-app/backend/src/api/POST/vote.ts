import { type Request, type Response } from 'express'
import { z } from 'zod'
//import { v4 as uid } from 'uuid'
import { config } from 'dotenv'

config()

export default async function handler(req: Request, res: Response) {

    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(409).json({ message: 'No client credentials provided' })

    const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');

    const [clientID, clientSecret] = decodedCredentials.split(':');

    if(
        process.env.CLIENT_ID !== clientID &&
        process.env.CLIENT_SECRET !== clientSecret
    ) return res.status(409).json({ message: 'Invalid credentials' })

    const vote = req.body
   
    const Vote = z.object({
        email: z.string(),
    })

    const result = Vote.safeParse(vote)
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })

   
   
    
    return res.status(200).json({ message: 'account created successfully' })
}