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
   
    const parseCookie = (cookie: string | undefined): string => {
        return cookie?.split(';')
        .find(cookie => cookie.trim().startsWith('session='))
        ?.replace('session=', '')  ?? ''
    }

  
    const cookieSession:Session = isJSONString(parseCookie(req.headers.cookie)) ? 
    JSON.parse(req?.cookies?.session) : 
    null

    const status = cookieSession ? 200 : 401;

    return res.status(status).json({ session: cookieSession });
}