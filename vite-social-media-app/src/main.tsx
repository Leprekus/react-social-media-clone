import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import RouterProvider from './providers/RouterProvider.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import ModalProvider from './providers/ModalProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <ModalProvider/>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </RouterProvider>
  </React.StrictMode>,
)
