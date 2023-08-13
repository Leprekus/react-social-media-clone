import { useState, lazy, Suspense } from 'react';
import Layout from '../Layout';
import Button from '../components/Button';



export default function Login() {
  const [createAccount, setCreateAccount] = useState(false)

  const CreateAccount = lazy(() => import('../components/CreateAccount'))
  return(
    <>
      {createAccount ?
        <Suspense fallback={<div>Loading...</div>}>
          <CreateAccount/>
        </Suspense> :
        <Layout>
          <Button onClick={()=>setCreateAccount(true)}>
            Create Account
          </Button>
          <Button>
            Sign in
          </Button>
        </Layout>
      }
    </>
  )

}
