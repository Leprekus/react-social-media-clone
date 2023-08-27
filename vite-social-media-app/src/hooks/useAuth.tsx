import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Session } from '../../typings';
import { useRouter } from './useRouter';
import { tryCatchGet, tryCatchPost } from '../lib/fetch-helpers';

type AuthContextType = {
  session: Session | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

interface SessionData {
  session: Session;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const MyAuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const pathname = router.pathname;
  const signIn = async (username: string, password: string) => {
    const endpoint = `${import.meta.env['VITE_BACKEND_URL']}api/POST/sign-in`;
    const credentials = btoa(
      `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
    );
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": 'true', //exposes headers to js turn off when cookies are working
        "ngrok-skip-browser-warning": "true",
        Authorization: `${credentials}`,
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ username, password }),
    });

    const { session } = await res.json();
    if (res.ok && session) {
      return await getSession()
      //return setSession(session)
    }
    //TODO: Handle error message

    setSession(null);
  };
  const signOut = async () => {
    if (!session) return;

    const endpoint = `${import.meta.env['VITE_BACKEND_URL']}api/POST/sign-out`;
    const [data, error] = await tryCatchPost<{ message: string }>({
      endpoint,
      payload: { userId: session.user.id, createdAt: session.createdAt },
      token: session.accessToken,
    });
    console.log({ signOut: data?.json?.message });

    if (error) return;
    else setSession(null);
  };

  const refreshToken = async () => {
    const endpoint = `${
      import.meta.env['VITE_BACKEND_URL']
    }api/POST/refresh-token`;
    const payload = { refreshToken: session?.refreshToken as string };

    const [data, error] = await tryCatchPost<SessionData>({
      endpoint,
      payload,
    });

    if (error || !data?.json?.session) return setSession(null);

    setSession(data.json.session);
  };

  const getSession = async () => {
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}api/GET/session`
    const [data, error] = await tryCatchGet<SessionData>({
      endpoint,
      
    });
    if (!error && data?.json?.session) {
      return setSession(data.json.session);
    }
  //   try {
  //   const res = await fetch(endpoint, {
  //     method: 'GET',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Credentials": 'true',
  //       "ngrok-skip-browser-warning": 'true',
  //      },
  //     credentials: 'include',
  //     mode: 'cors',
  //   });

  //   if(res.ok) {
  //     const { session } = await res.json()
  //     console.log({ getSession: session })
  //     setSession(session)
  //   }

  // } catch(error) {
  //   console.log('request failed ', error)
  //   setSession(null);
  // }

  };

  useEffect(() => {
    getSession();

    const validSession =
      session && session?.expiresAt && session.expiresAt > Date.now();

    if (validSession && pathname === '/login') router.push('/');

    if (session && session?.expiresAt) {
      const refreshThreshold = session?.expiresAt - 5 * 60 * 1000; // 5 minutes in milliseconds
      //handles about to expire / expired tokens
      if (session.expiresAt < Date.now() || refreshThreshold <= Date.now())
        refreshToken();
    } else if (!validSession) router.push('/login');
  }, [session?.expiresAt, pathname]);
  const values = {
    session,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw Error('useAuth must be used within a MyAuthContextProvider');

  return context;
};
