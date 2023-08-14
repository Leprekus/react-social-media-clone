import { useState, lazy, Suspense } from 'react';
import Layout from '../Layout';
import Button from '../components/Button';
import Loading from '../components/Loading';
import SignInContent from '../components/SignInContent';



export default function Login() {
  const [createAccount, setCreateAccount] = useState(false)

  const CreateAccount = lazy(() => import('../components/CreateAccount'))
  return(
    <>
      {createAccount ?
        <Suspense fallback={<Loading/>}>
          <CreateAccount/>
        </Suspense> :
        <Layout>
          <SignInContent/>
          <Button onClick={()=>setCreateAccount(true)}>
            Create Account
          </Button>
        </Layout>
      }
    </>
  )

}
