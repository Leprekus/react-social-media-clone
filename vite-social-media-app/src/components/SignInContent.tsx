import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function SignInContent() {
    const [formData, setFormData] = useState({
        email: 'email@mock.com',
        password: 'qwerty'
    })

    const { signIn } = useAuth()
  return (
    <>
        <Input placeholder='email'/>
        <Input placeholder='password'/>
        <Button onClick={() => signIn(formData.email, formData.password)}>
            Sign in
        </Button>
    </>
  )
}
