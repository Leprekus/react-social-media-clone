import { User } from '../../../typings'
import { SessionTable } from '../Tables'

export default async function verifyToken (accessToken?: string):Promise<User | null> {
    if(!accessToken) return null

    const session = await SessionTable.getOne().where('accessToken').equals(accessToken).run()

    if(!session?.createdAt) return null

    const tokenIsValid = (session.createdAt + 60 * 60 * 1000) > Date.now() 

    if(tokenIsValid && session.user) {

        return session.user
    }

    return null
}