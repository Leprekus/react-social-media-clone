import Layout from './Layout'
import NotFound from './components/NotFound'
import routes from './lib/routes'

export default function Router() {

    const path = window.location.pathname
    
    const match = routes.find(route => route.path === path)
    const Page = match?.component ? match?.component : <NotFound/>

  return (
    <Layout>
      { Page }
    </Layout>
  )
}
