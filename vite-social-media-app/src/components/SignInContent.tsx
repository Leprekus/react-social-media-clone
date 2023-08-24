import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function SignInContent() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { signIn } = useAuth()
  return (
    <>
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
    </>
  )
}
