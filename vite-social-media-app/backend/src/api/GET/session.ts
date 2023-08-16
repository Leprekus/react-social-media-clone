import { type Request, type Response } from 'express'
import { Session } from '../../../../typings'

export default async function handler(req: Request, res: Response) {
    const isJSONString = (str: string) => {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    }
    const cookieSession:Session = isJSONString(req?.cookies?.session) ? 
    JSON.parse(req?.cookies?.session) : 
    null
    //const isExpired = cookieSession?.expiresAt && cookieSession?.expiresAt < Date.now() 

    // if(!cookieSession) 
    //     res.cookie('session', null,  { httpOnly: true, expires: new Date(0) })

    const status = cookieSession ? 200 : 404;

    return res.status(status).json({ session: cookieSession });
}