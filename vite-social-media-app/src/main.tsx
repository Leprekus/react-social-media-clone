import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import './global.css'
import RouterProvider from './providers/RouterProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <Router/>
    </RouterProvider>
  </React.StrictMode>,
)
