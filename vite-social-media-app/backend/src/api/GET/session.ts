import { type Request, type Response } from 'express'
import { Session } from '../../../../typings'

export default async function handler(req: Request, res: Response) {
    
    const cookieSession:Session = req?.cookies?.session && JSON.parse(req?.cookies?.session)
    const isExpired = cookieSession?.expiresAt && cookieSession?.expiresAt < Date.now() 

    if(isExpired) 
        return res.cookie('session', null,  { httpOnly: true, expires: new Date(0) })

    const responseSession = cookieSession || null;
    const status = responseSession ? 200 : 404;

    return res.status(status).json({ session: responseSession });
}