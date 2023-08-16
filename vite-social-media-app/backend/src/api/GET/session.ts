import { type Request, type Response } from 'express'

export default async function handler(req: Request, res: Response) {
    
    const cookieSession = JSON.parse(req?.cookies?.session)
    
    return cookieSession ? res.status(200).json({ session: cookieSession }) :
    res.status(404).json({ session: null })
}