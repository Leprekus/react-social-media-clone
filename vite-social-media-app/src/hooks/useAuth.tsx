import { ReactNode, createContext, useContext } from 'react';
import { Session } from '../../typings';

type AuthContextType  = {
    session: Session | null
}
export const AuthContext = createContext<AuthContextType | undefined>( undefined )

export const MyAuthContextProvider = ({ children }: { children: ReactNode}) => {
    //TODO: add logic to handle auth
    const values = {
        session: {
            createdAt: '',
            expiresAt: '',
            refreshToken: '',
            accessToken: '',
            user: {
                id: '',
                username: '',
                email: '',
                bio: '',
            },
        }
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