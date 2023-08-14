import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../typings';
import { useRouter } from './useRouter';
import { tryCatchPost } from '../lib/fetch-helpers';


type AuthContextType  = {
    session: Session | null
    signIn: (username: string, password: string) => void
}

interface SessionData {
    session: Session
}
export const AuthContext = createContext<AuthContextType | undefined>( undefined )

export const MyAuthContextProvider = ({ children }: { children: ReactNode}) => {
    
    const [session, setSession] = useState<Session | null>(null)
    const router = useRouter()
    const pathname = router.pathname
    const signIn = async (email: string, password: string) => {

            const endpoint = `${import.meta.env['VITE_BACKEND_URL']}api/POST/sign-in`
            const payload = { email, password }
            const [data , error] = await tryCatchPost<SessionData>({ endpoint, payload })
    

            if(error || !data?.session)
                return setSession(null)
                //TODO: Handle error message
            
            setSession(data?.session)
    }

    const refreshToken = async () => {
        const endpoint = `${import.meta.env['VITE_BACKEND_URL']}api/POST/refresh-token`
        const payload = session?.refreshToken as string
        
        const [data, error] = await tryCatchPost<SessionData>({ endpoint, payload })

        if(error || !data?.session)
            return setSession(null)

        setSession(data.session)
    }

    const newLogin = session && (session?.expiresAt && session.expiresAt > Date.now()) && pathname === '/login'
    const expiredSession = session && session?.expiresAt && session.expiresAt < Date.now()
    useEffect(() => {
        if(newLogin) 
            return router.push('/')
        
        if(expiredSession) 
            refreshToken()  
        
        else (!session) 
            router.push('/login')

    },[session, pathname, newLogin, expiredSession])
    const values = {
        session, 
        signIn
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