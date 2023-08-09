import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type RouterContextType  = {
    pathname: string;
    push: (path: string) => void;
    replace: (path: string) => void;
    redirect: (path: string) => void;
    forward: () => void;
    backward: () => void;
}
export const RouterContext = createContext<RouterContextType | undefined>( undefined )


export const MyRouterContextProvider = ({ children }: { children: ReactNode }) => {
   
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(()=> {

        const pathListener = () => {
            setCurrentPath(window.location.pathname)
            return currentPath
        }

        window.addEventListener('popstate', pathListener)
        console.log({ currentPath })

        return () => window.removeEventListener('popstate', pathListener)
    }, [currentPath])


    const push = (path:string) => {
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

    
    const value = {
        push,
        replace,
        redirect,
        pathname: currentPath,
        forward,
        backward
    };
      

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
