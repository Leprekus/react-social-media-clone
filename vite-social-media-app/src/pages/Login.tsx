import Layout from '../Layout'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  return (
    <Layout>
        <form 
        onSubmit={(e) => e.preventDefault()}
        className='
        flex
        flex-col
        w-[400px]
        gap-2
        mx-auto
        text-gray-800
        '>
          <div className='w-24 h-24 bg-gray-200 rounded-full mx-auto'>logo</div>
          <div className='w-24 h-24 bg-gray-200 rounded-full mx-auto'/>
          <label htmlFor="email">Email</label>
          <Input 
            placeholder='email'
            type='email'
            
            />

          <label htmlFor="name">Names</label>
          <Input 
            placeholder='name'
            type='text'
            
            />

          <label htmlFor="username">Username</label>
          <Input 
            placeholder='username'
            type='text'
            
            />
          
          <label htmlFor="password">Password</label>
          <Input 
            placeholder='password'
            type='password'
            
            />
            <Button>Create</Button>
        </form>
    </Layout>
  )
}
