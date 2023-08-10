import Layout from './Layout'
import NotFound from './components/NotFound'
import { useAuth } from './hooks/useAuth'
import { useRouter } from './hooks/useRouter'

import routes from './lib/routes'
import Login from './pages/Login'

export default function Router() {

    const router = useRouter()
    const { isAuthed } = useAuth()

    if(!isAuthed) {
      
      router.replace('/login')
      return <Login/>
      
    }

    const path = router.pathname
    console.log({ path })

    // const Page = () => {
    //   const match = routes.find(route => {

    //     if(route.path === path) return route.path === path

    //     const split = route.path.split('/')
    //     const routeContainsSlug = split[split.length - 1].includes(':')

    //     const pathDepth = path.split('/').length
    //     const routeDepth = route.path.split('/').length

    //     // if the route contains a slug ':'
    //     // and the route and requested path
    //     // have the same pathDepth
    //     // render return the route
    //     if(routeContainsSlug && (routeDepth === pathDepth)) {
    //       return route
    //     }

    //   })
    //   return match?.component ? match?.component : <NotFound/>
    // }
    const Page = () =>  router.renderRoute(routes, <NotFound/>)
    
 

  return (
    <Layout>
      <Page/>
    </Layout>
  )
}
