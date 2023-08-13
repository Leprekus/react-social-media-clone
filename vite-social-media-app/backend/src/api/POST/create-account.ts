import { type Request, type Response } from 'express'
import { NewAccount, User } from '../../../../typings'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { JSONDB } from '../../DB'


export default async function handler(req: Request, res: Response) {

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

    console.log(user)
    const UsersTable = new JSONDB<User>('users')
    //await Users.insert(user)
   

    
    
    return res.status(200).json({ message: 'account created successfully' })
}