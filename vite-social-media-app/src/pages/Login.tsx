import { useState, lazy, Suspense } from 'react';
import Layout from '../Layout';
import Button from '../components/ui/Button';
import Loading from '../components/Loading';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';



export default function Login() {
  const [createAccount, setCreateAccount] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
})

const { signIn } = useAuth()

  const CreateAccount = lazy(() => import('../components/CreateAccount'))
  return(
    <>
      {createAccount ?
        <Suspense fallback={<Loading/>}>
          <CreateAccount/>
        </Suspense> :
        <Layout>
          <Input placeholder='username' onChange={(e) => 
          setFormData(prev => ({ 
            ...prev, 
            username: e.target.value
          })
        )}/>
        <Input placeholder='password' onChange={(e) => 
          setFormData(prev => ({ 
            ...prev, 
            password: e.target.value
          })
        )}/>
        <Button onClick={async () => await signIn(formData.username, formData.password)}>
            Sign in
        </Button>
          <Button onClick={()=>setCreateAccount(true)}>
            Create Account
          </Button>
        </Layout>
      }
    </>
  )

}
