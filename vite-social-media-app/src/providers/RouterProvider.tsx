import React, { ReactNode } from 'react'
import { MyRouterContextProvider } from '../hooks/useRouter'

interface RouterProviderProps { children: ReactNode }
export default function RouterProvider({ children }: RouterProviderProps) {
  return (
    <MyRouterContextProvider>
        { children }
    </MyRouterContextProvider>
  )
}
