import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Session } from '../../typings';


type AuthContextType  = {
    session: Session | null
    signIn: (username: string, password: string) => void
}
export const AuthContext = createContext<AuthContextType | undefined>( undefined )

export const MyAuthContextProvider = ({ children }: { children: ReactNode}) => {
    //TODO: add logic to handle auth
    const [session, setSession] = useState<Session | null>(null)

    const signIn = async (email: string, password: string) => {
        const credentials = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
            const res = await fetch(`${import.meta.env['VITE_BACKEND_URL']}api/POST/sign-in`, {
              method: 'POST',
              headers:{ 
                'Content-Type': 'application/json',
                'Authorization': `${credentials}`
              },
              body: JSON.stringify({
                email, 
                password
              })
            })
    
            if(!res.ok)
                return setSession(null)
    
            const { session } = await res.json() 
           
            setSession(session)
    }
    useEffect(() => {
        
        if(session && session?.expiresAt < Date.now()) {
            //TODO: handle refresh token
        }

    },[session])
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