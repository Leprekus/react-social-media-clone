import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import useDebounce from '../../hooks/useDenounce';
import { useRouter } from '../../hooks/useRouter';
import qs from 'query-string'
import ProfileListItem from '../../components/ProfileListItem';
import { tryCatchGet } from '../../lib/fetch-helpers';
import toast from 'react-hot-toast';


export default function Search() {

  const router = useRouter()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)
  const fetchUsers = async () => {

    const [ data, error ] = await tryCatchGet({ 
      endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET/search${value}`,
    })

    if(error || !data?.res.ok) toast.error('Failed to load users')

  }

  useEffect(() => {
    const query = {
      user: debouncedValue
    }
    const url = qs.stringifyUrl({
      url: '/search',
      query
    }) 
  
    router.push(url)
  

    if(value.length > 0) {
      fetchUsers()
    }
  },[debouncedValue, router])

  return (
    <div>
      <Input 
      onChange={(e) => setValue(e.target.value)}
      placeholder='Search username'/>
      <ProfileListItem/>
    </div>
  )
}
