import { ReactNode, createContext, useContext } from 'react';

type AuthContextType  = {
    accessToken: string;
    user: object;
    isLoading: boolean;
    isAuthed: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>( undefined )

export const MyAuthContextProvider = ({ children }: { children: ReactNode}) => {
    //TODO: add logic
    const values = {
        accessToken: '',
        user: {},
        isLoading: false,
        isAuthed: true
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