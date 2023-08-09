import Layout from './Layout'
import NotFound from './components/NotFound'
import { useAuth } from './hooks/useAuth'
import { useRouter } from './hooks/useRouter'

import routes from './lib/routes'
import Login from './pages/Login'

export default function Router() {

    const router = useRouter()
    const { isAuth } = useAuth()

    if(!isAuth) {
      
      router.replace('/login')
      return <Login/>
      
    }

    const path = router.pathname
    console.log({ path })

    const Page = () => {
      const match = routes.find(route => route.path === path)
      return match?.component ? match?.component : <NotFound/>
    }
    
 

  return (
    <Layout>
      <Page/>
    </Layout>
  )
}
