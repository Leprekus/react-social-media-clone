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

    const status = cookieSession ? 200 : 401;

    console.log({ cookieSession, cookies: req.cookies })
    return res.status(status).json({ session: cookieSession });
}