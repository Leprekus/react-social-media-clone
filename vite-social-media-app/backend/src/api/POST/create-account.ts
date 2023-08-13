import { type Request, type Response } from 'express'
export default async function handler(req: Request, res: Response) {

    const user = req.body
    console.log({ user })
    return res.status(200).json({ message: 'success' })
}