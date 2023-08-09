import Layout from './Layout'
import NotFound from './components/NotFound'
import { useRouter } from './hooks/useRouter'

import routes from './lib/routes'

export default function Router() {

    const router = useRouter()
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
