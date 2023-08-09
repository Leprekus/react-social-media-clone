import { ReactNode } from 'react'
import { MyAuthContextProvider } from '../hooks/useAuth'

interface AuthProviderProps { children: ReactNode }
export default function AuthProvider({ children }: AuthProviderProps ) {

  return (
    <MyAuthContextProvider>
      { children }
    </MyAuthContextProvider>
  )
}
