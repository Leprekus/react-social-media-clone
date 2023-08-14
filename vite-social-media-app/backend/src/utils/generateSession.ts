import { Session, User } from '../../../typings';
import { SessionTable } from '../Tables';
import { v4 as uid } from 'uuid';
export default async function generateSession (user: User): Promise<Session> {
    const CHARACTERS = 'acbdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let token = ''

    for(let i = 0 ; i < 64; i++) {
        const index = Math.floor(Math.random() * CHARACTERS.length)
        token += CHARACTERS[index]
    }

    const session = {
        createdAt: Date.now(),
        refreshToken: uid(),
        accessToken: token,
        user
    }

    await SessionTable.insert(session)

    return {
        ...session,
        expiresAt: session.createdAt + (3600 * 1000)

    }
    
}