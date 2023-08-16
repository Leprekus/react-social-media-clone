import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../typings';
import { useRouter } from './useRouter';
import { tryCatchGet, tryCatchPost } from '../lib/fetch-helpers';
import { useCookies } from 'react-cookie'


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
        const payload = { refreshToken : session?.refreshToken as string }
        
        const [data, error] = await tryCatchPost<SessionData>({ endpoint, payload })

        if(error || !data?.session)
            return setSession(null)

        setSession(data.session)
    }

    const getSession = async () => {

        const [data, error] = await tryCatchGet<SessionData>({ endpoint: `${import.meta.env['VITE_BACKEND_URL']}api/GET/session`})

        if(!error && data?.session) {
            setSession(data?.session)
            console.log({ getSessionRes: data?.session })
        }

    }


    const validSession = session && session?.expiresAt && session.expiresAt > Date.now()
    useEffect(() => {
        getSession()

        if(validSession && pathname ==='/login') router.push('/')
        
        else if (!validSession) router.push('/login')

    },[validSession, session])
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