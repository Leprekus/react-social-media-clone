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

          <div className='flex flex-col gap-8 mx-auto w-full px-10 sm:px-0 sm:pr-20 sm:w-96'>
            <div className='flex flex-col gap-2'>
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
              
            </div>
            <div className='flex flex-col gap-2'>
              <Button 
              className='
                text-lg md:text-base
                w-full
                bg-gray-400/20
                transition
                hover:bg-gray-400/10
                active:bg-gray-400/0
                border-none
              '
              onClick={async () => signIn(formData.username, formData.password)}>
                Sign in
              </Button>
              <Button onClick={()=>setCreateAccount(true)}>
                Create Account
              </Button>
            </div>
          </div>
        </Layout>
      }
    </>
  )

}
