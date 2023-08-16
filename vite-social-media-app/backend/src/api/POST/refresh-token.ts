import { type Request, type Response } from 'express'
import { SessionTable } from '../../Tables'
import generateSession from '../../utils/generateSession'
import { User } from '../../../../typings'

export default async function handler(req: Request, res: Response) {
    
    const { refreshToken } = req.body
    const expiredSession = await SessionTable.getOne()
    .where('refreshToken').equals(refreshToken).run()
    
    
    console.log({ refreshToken, expiredSession })
    
    if(!expiredSession) {
        res.cookie('session', null)
        return res.status(404).json({})
    }

    await SessionTable.deleteOne().where('refreshToken').equals(refreshToken).run()

    const user = expiredSession.user as User

    const session = await generateSession(user, res)
    console.log(`session refreshed old refresh ${refreshToken} new refresh ${session.refreshToken}`)
    return res.status(200).json({ session })
    
}