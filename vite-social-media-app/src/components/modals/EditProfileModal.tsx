import { BiSolidUser } from 'react-icons/bi'
import useEditProfileModal from '../../hooks/useEditProfileModal'
import Box from '../ui/Box'
import { useEffect, useState } from 'react'
import Input from '../ui/Input'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { User } from '../../../typings'
import Loading from '../Loading'
import _ from 'lodash'
import { tryCatchPost } from '../../lib/fetch-helpers'
import toast from 'react-hot-toast'

interface UserData {
  user: User
}

export default function EditProfileModal() {
  const { isOpen, Close } = useEditProfileModal()
  const { session } = useAuth()
  const [isDisabled, setIsDisabled] = useState(true)
  const [src, setSrc] = useState(null)
  const fetchProfileImage = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/GET/profile/picture?userId=${session?.user.username}`)
    const data = await res.json()
    setSrc(data.profileImage)
  }
  const [formData, setFormData] = useState<User >({
    email: '',
    name: '',
    username: '',
    bio: '',
    profileImage: '',
    id: ''
  });
  useEffect(() => {
    if(session?.user) {
      setFormData({ ...session?.user })
    }
    if(session?.user.profileImage) {
      fetchProfileImage()
    }

  }, [session?.user, ])

  useEffect(() => {

    if(session?.user && _.isEqual(formData, session.user))
      setIsDisabled(true)

    else setIsDisabled(false)

  }, [formData, session])

  if(!isOpen) return null
  // TODO: connect form to db to persist changes

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target?.files) {
      
      const [ file ] = event.target.files

      const reader = new FileReader();
      reader.onload = () => {

        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }))
      };
      reader.readAsDataURL(file);

    } 
  }

  const handleSubmit = async () => {

    if(formData.id !== session?.user.id) return

    console.log({ formData})
    const [data, error] = await tryCatchPost<UserData>({ 
      endpoint: `${import.meta.env.VITE_BACKEND_URL}api/PUT/profile`, 
      token: session.accessToken, 
      payload: formData, 
      method: 'PUT'})

      if(error || !data?.res.ok) toast.error('Failed to update profile')
        

      if(data?.res.ok) toast.success('Profile updated')
  }
  

  return (
    <Box
      onClick={Close}
    >
      { session ?
        <div className='flex flex-col gap-4 p-4'>
        {
          src ? 
          <img 
          className="w-24 h-24 bg-gray-200 rounded-full mx-auto object-cover shadow-md" 
          src={src}
          />
          :<span className='
          mx-auto 
          relative 
          w-24 h-24 
          bg-gray-400/40 
          flex 
          items-center 
          justify-center 
          rounded-full
          transition
          hover:bg-gray-400/80
          '>
            <BiSolidUser size={60} className='text-white'/>
            <input
            className="w-24 h-24 bg-gray-200 rounded-full absolute hover:cursor-pointer opacity-0"
            type='file'
            name='profileImage'
            accept='image/*'
            onChange={handleImageChange}
            />
          </span>
        }
        <label htmlFor="">Name
        <Input value={ formData.name } onChange={(e) => 
          setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))}/>
        </label>

        <label htmlFor="">Username
        <Input value={ formData.username } onChange={(e) => 
          setFormData(prev => ({
            ...prev,
            username: e.target.value
          }))}/>
        </label>

        <label htmlFor="">Email
        <Input value={ formData.email } onChange={(e) => 
          setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))}/>
        </label>

        <label htmlFor="">Bio
        <Input value={ formData.bio } onChange={(e) => 
          setFormData(prev => ({
            ...prev,
            bio: e.target.value
          }))}/>
        </label>
        <Button 
        onClick={handleSubmit}
        disabled={isDisabled}>Save</Button>
      </div> :
       <Loading/>
       }
    </Box>
  )
}
