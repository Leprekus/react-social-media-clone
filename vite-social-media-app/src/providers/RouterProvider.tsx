import React, { ReactNode } from 'react'
import { MyContextProvider } from '../hooks/useRouter'

interface RouterProviderProps { children: ReactNode }
export default function RouterProvider({ children }: RouterProviderProps) {
  return (
    <MyContextProvider>
        { children }
    </MyContextProvider>
  )
}
