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

    const cookie = req.headers.cookie?.split(';')
    .find(cookie => cookie.startsWith('session='))

    const cookieSession:Session = (cookie &&  isJSONString(cookie)) ? 
    JSON.parse(req?.cookies?.session) : 
    null

    const status = cookieSession ? 200 : 401;

    console.log({ cookieSession, cookie, cookies: req.headers.cookie })
    return res.status(status).json({ session: cookieSession });
}