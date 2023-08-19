import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function SignInContent() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { signIn } = useAuth()
  return (
    <>
        <Input placeholder='email' onChange={(e) => 
          setFormData(prev => ({ 
            ...prev, 
            email: e.target.value
          })
        )}/>
        <Input placeholder='password' onChange={(e) => 
          setFormData(prev => ({ 
            ...prev, 
            password: e.target.value
          })
        )}/>
        <Button onClick={() => signIn(formData.email, formData.password)}>
            Sign in
        </Button>
    </>
  )
}
