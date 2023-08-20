import { type Request, type Response } from 'express'
import { UserTable } from '../../Tables';

export default async function handler(req: Request, res: Response) {

    const query = req.query.user as string
    const users = await UserTable.getAll().where(query).in('username' as unknown as unknown[]).run()
    console.log({ users, query })
    

    return res.status(200).json({ users });
}