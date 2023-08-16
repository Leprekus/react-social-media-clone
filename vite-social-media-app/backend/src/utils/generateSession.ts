import { Session, User } from '../../../typings';
import { SessionTable } from '../Tables';
import { v4 as uid } from 'uuid';
import type { Response } from 'express';

function generateToken (uid: string) {
    const CHARACTERS = 'acbdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const uidCharacters = uid.split('')
    let token = ''

    for(let i = 0 ; i < 64; i++) {
        const charsIndex = Math.floor(Math.random() * CHARACTERS.length)
        const uidIndex = Math.floor(Math.random() * uidCharacters.length)
        token += i % 2 === 0 ? CHARACTERS[charsIndex] : uidCharacters[uidIndex]
    }
    return token
}

export default async function generateSession (user: User, res: Response): Promise<Session> {
    
    const token = generateToken(uid())

    const session = {
        createdAt: Date.now(),
        refreshToken: uid(),
        accessToken: token,
        user
    }

    await SessionTable.insert(session)

   const expires = new Date()
   expires.setDate(expires.getDate() + 7)
   const sessionCookie = {
    ...session,
    expiresAt: session.createdAt + (3600 * 1000)
}
   
   res.cookie('session', JSON.stringify(sessionCookie), { 
    httpOnly: true, 
    maxAge: 604800000, //7 days in miliseconds
    expires 
})

    return sessionCookie
    
}