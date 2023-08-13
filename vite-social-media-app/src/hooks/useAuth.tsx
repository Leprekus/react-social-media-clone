import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../typings';
import tryCatch from '../lib/tryCatch';

type AuthContextType  = {
    session: Session | null
}
export const AuthContext = createContext<AuthContextType | undefined>( undefined )

export const MyAuthContextProvider = ({ children }: { children: ReactNode}) => {
    //TODO: add logic to handle auth
    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        const handleFetchSession = async () => {
            const [sessionResponse] = await tryCatch<Session>('http://localhost:4321/api/signin')
            
            if(sessionResponse) 
                setSession({
                    ...sessionResponse,
                    expiresAt: sessionResponse?.createdAt * 1000,
                })
        }
        if(session && session?.expiresAt < Date.now()) {
            //TODO: handle refresh token
        }

        handleFetchSession()
    },[session])
    const values = {
        session
    }

    return (
        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>
        )

}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(context === undefined) 
        throw Error('useAuth must be used within a MyAuthContextProvider')

    return context
}