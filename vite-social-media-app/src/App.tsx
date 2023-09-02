import Layout from './Layout'
import NotFound from './components/NotFound'
import { useRouter } from './hooks/useRouter'

import routes from './lib/routes'


export default function Router() {

    const router = useRouter()
    

    // if(!session) {

    //   router.replace('/login')
    //   return <Login/>
      
    // }


    const Page = () =>  router.renderRoute(routes, <NotFound/>)
    
  return (
    <Layout>
      <Page/>
    </Layout>
  )
}
