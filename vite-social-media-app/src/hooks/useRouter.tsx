import { 
    ReactNode, 
    createContext, 
    useContext, 
    useEffect, 
    useState } from 'react';
import qs from 'query-string'

type RouterContextType  = {
    pathname: string;
    push: (path: string) => void;
    replace: (path: string) => void;
    redirect: (path: string) => void;
    forward: () => void;
    backward: () => void;
    renderRoute: (routes: { path: string, component: ReactNode }[], NotFound: ReactNode) => ReactNode
}
export const RouterContext = createContext<RouterContextType | undefined>( undefined )


export const MyRouterContextProvider = ({ children }: { children: ReactNode }) => {
   
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(()=> {

        const pathListener = () => {
            setCurrentPath(`/${window.location.pathname}`)
            return currentPath
        }

        window.addEventListener('popstate', pathListener)

        return () => window.removeEventListener('popstate', pathListener)
    }, [currentPath])


    const push = (path:string) => {
        console.log({ pushedPath: path })
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };
    
    const replace = (path:string) => {
        window.history.replaceState({}, '', path);
        setCurrentPath(path);
    };
    
    const redirect = (path:string) => {
        window.location.href = path;
    };

    const forward = () => {
        window.history.forward()
    }

    const backward = () => {
        window.history.back()
    }

    const renderRoute = (routes: { path: string, component: ReactNode }[], NotFound: ReactNode) => {
        const match = routes.find(route => {

    
            const split = route.path.split('/')
            const routeContainsSlug = split[split.length - 1].includes(':')
            
            const parsedUrl = qs.parseUrl(currentPath).url
    
    
    
            // if the route contains a slug ':'
            // and the route and requested path
            // have the same pathDepth
            // render return the route
            if(route.path === parsedUrl) return route.path === parsedUrl


            const pathSegments = parsedUrl.split('/')
            const routeSegments = route.path.split('/')

            const routeWithoutSlug = routeSegments.filter(segment => !segment.includes(':'))
            const pathMatchesDynamicRoute = routeWithoutSlug
                .every(segment =>pathSegments.indexOf(segment) !== -1)

            if(routeContainsSlug && pathMatchesDynamicRoute) 
              return route
            

          })
        return match?.component ? match?.component : NotFound
    };
    
    const value = {
        push,
        replace,
        redirect,
        pathname: currentPath,
        forward,
        backward,
        renderRoute

    }
      

    return (
        <RouterContext.Provider value={value}>
            { children }
        </RouterContext.Provider>
    )
}

export const useRouter = () => {

    const context = useContext(RouterContext)

    if(context === undefined) 
        throw Error('Hook must be used inside a router context')
    return context
    
}
