import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import useDebounce from '../../hooks/useDebounce';
import qs from 'query-string'
import ProfileListItem from '../../components/ProfileListItem';
import { tryCatchGet } from '../../lib/fetch-helpers';
import toast from 'react-hot-toast';
import { User } from '../../../typings';
import Loading from '../../components/Loading';

interface UserData { users: User[] }

export default function Search() {

  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [users, setUsers] = useState<User[] | null>(null)
  const debouncedValue = useDebounce(value)
  const fetchUsers = async (url: string) => {

    const [ data, error ] = await tryCatchGet<UserData>({ 
     endpoint: `${import.meta.env.VITE_BACKEND_URL}api/GET${url}`,
    })

    if(error || !data?.res.ok) toast.error('Failed to load users')

    if(data?.json?.users) setUsers(data?.json?.users)

    setIsLoading(false)
  }

  useEffect(() => {
    const query = {
      user: debouncedValue
    }
    const url = qs.stringifyUrl({
      url : '/search',
      query
    }) 


    if(value.length > 0) {
      setIsLoading(true)
      fetchUsers(url)
    }
  },[debouncedValue])

  return (
    <div className='
    flex 
    flex-col 
    items-center 
    gap-4 
    w-full 
    max-w-xl 
    pt-5 
    px-10
    mx-auto
    '>
      <Input 
      className=''
      onChange={(e) => setValue(e.target.value)}
      placeholder='Search username'/>
      <div className='flex flex-col items-center gap-4 sm:p-0 max-w-7xl w-full'>
        {isLoading && <Loading/>}
  
        {users && users?.length > 0 &&
        users?.map((user:User) => <ProfileListItem user={user}/>)
        }
      </div>
    </div>
  )
}
