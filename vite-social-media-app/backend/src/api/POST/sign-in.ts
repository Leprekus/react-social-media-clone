import { NextFunction, type Request, type Response } from 'express'
import { config } from 'dotenv'
import { UserTable } from '../../Tables'
import { Session, User } from '../../../../typings'
import generateSession from '../../utils/generateSession'

config()

export default async function handler(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(409).json({ message: 'No client credentials provided' })

    const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');

    const [clientID, clientSecret] = decodedCredentials.split(':');

    if(
        process.env.CLIENT_ID !== clientID &&
        process.env.CLIENT_SECRET !== clientSecret
    ) return res.status(409).json({ message: 'Invalid credentials' })
    
    const { email, password } = req.body
    
    const storedUser = await UserTable.getOne()
    .where('email').equals(email)
    .where('password').equals(password)
    .run()

    delete storedUser?.password

    if(storedUser) {
        const session: Session = await generateSession((storedUser as User)!, res)

        return res.status(200).json({ session })
    }
    return res.status(401).json({ message: 'invald credentials'})
    
}