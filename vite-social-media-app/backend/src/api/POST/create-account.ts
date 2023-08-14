import { type Request, type Response } from 'express'
import { NewAccount, User } from '../../../../typings'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { JSONDB } from '../../DB'
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

    let user:NewAccount = req.body
   
    const User = z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        username: z.string(),
        bio: z.string(),
        profileImage: z.string(),
    })

    const result = User.safeParse(user)
    if(!result.success)
        return res.status(422).json({ error: 'Form validation failed' })

    user = {
        ...user,
        id: uuid()
    }

    const UsersTable = new JSONDB<User>('users')
  
    const email = await UsersTable.getOne().where('email').equals(user.email).run()
    const username = await UsersTable.getOne().where('username').equals(user.username).run()
    
    if(email || username) 
        return res.status(409).json({ message: 'usernmae or password already exists'})

    UsersTable.insert(user)
    
    return res.status(200).json({ message: 'account created successfully' })
}