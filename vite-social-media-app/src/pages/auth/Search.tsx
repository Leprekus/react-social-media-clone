import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import useDebounce from '../../hooks/useDenounce';
import { useRouter } from '../../hooks/useRouter';
import qs from 'query-string'
import ProfileListItem from '../../components/ProfileListItem';
import { tryCatchGet } from '../../lib/fetch-helpers';
import toast from 'react-hot-toast';
import { User } from '../../../typings';

interface UserData { users: User[] }

export default function Search() {

  const router = useRouter()
  const [value, setValue] = useState('')
  const [users, setUsers] = useState<User[] | null>(null)
  const debouncedValue = useDebounce(value)
  const fetchUsers = async (query: string) => {

    const [ data, error ] = await tryCatchGet<UserData>({ 
      endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET${query}`,
    })

    if(error || !data?.res.ok) toast.error('Failed to load users')

    if(data?.json?.users) setUsers(data?.json?.users)

    console.log(data?.json?.users)
  }

  useEffect(() => {
    const query = {
      user: debouncedValue
    }
    const url = qs.stringifyUrl({
      url : '/search',
      query
    }) 

    router.push(url)

    if(value.length > 0) {
      fetchUsers(url)
    }
  },[debouncedValue, router])

  console.log('rendered', users)
  return (
    <div>
      <Input 
      onChange={(e) => setValue(e.target.value)}
      placeholder='Search username'/>

      <p>{ users ? 'loaded' : 'not loaded' }</p>
      {users?.map((user:User) => <ProfileListItem user={user}/>)}
      
    </div>
  )
}
