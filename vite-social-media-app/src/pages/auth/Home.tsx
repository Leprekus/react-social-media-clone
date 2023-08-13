
import { useState } from 'react'
import Post from '../../components/Post'

export default function Home() {
  const[data, setData] = useState('')
  const handleFetch = async() => {
    const res = await fetch('http://localhost:4321/api')
    const json = await res.json()
    setData(json.message)
  
    
  }
  return (
    <div>
      <button onClick={handleFetch}>Fetch</button>
      <p>{ data }</p>
      <Post/>
    </div>
  )
}
