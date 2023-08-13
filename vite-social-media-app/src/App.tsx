import Layout from './Layout'
import NotFound from './components/NotFound'
import { useAuth } from './hooks/useAuth'
import { useRouter } from './hooks/useRouter'

import routes from './lib/routes'
import Login from './pages/Login'

export default function Router() {

    const router = useRouter()
    const { session } = useAuth()

    console.log({ session })
    if(!session) {
      
      router.replace('/login')
      return <Login/>
      
    }

    const path = router.pathname
    console.log({ path })

    const Page = () =>  router.renderRoute(routes, <NotFound/>)

  return (
    <Layout>
      <Page/>
    </Layout>
  )
}
