import { useState, lazy, Suspense } from 'react';
import Layout from '../Layout';
import Button from '../components/ui/Button';
import Loading from '../components/Loading';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from '../hooks/useRouter';



export default function Login() {
  const router = useRouter()
  const [createAccount, setCreateAccount] = useState(false)
  const [formData, setFormData] = useState({
    username: 'Leprekus',
    password: 'qwerty'
})

const { signIn, errorCode } = useAuth()

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
              <Input placeholder='username' 
              value={formData.username}
              onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                username: e.target.value
              })
                      )}/>
              <Input 
              value={formData.password}
              placeholder='password' onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                password: e.target.value
              })
                      )}/>
              <p className='text-red-600 text-xs w-fit mx-auto mt-3'>{errorCode === 401 && 'Incorrect username or password'}</p>
              <button 
              onClick={() => router.redirect('/login')}
              className='text-red-600 text-xs group w-fit mx-auto'>
                {(errorCode && errorCode  !== 401) && 'Something went wrong click to refresh'}
                <span className="block max-w-full opacity-0 group-hover:opacity-100 transition-all duration-100 h-[1px] bg-red-600 mt-0.5"></span>
              </button>
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
