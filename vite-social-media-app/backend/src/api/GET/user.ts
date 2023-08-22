import { type Request, type Response } from 'express'
import {  UserTable } from '../../Tables'


export default async function handler(req: Request, res: Response) {

    const username = req.query.username
    
    const user = await UserTable.getOne().where('username').equals(username).run()
    
    if(!user)
        return res.status(404).json({ message: 'User not found' })

    return res.status(200).json({ user })
  
}