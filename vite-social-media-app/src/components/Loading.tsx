import { BarLoader } from 'react-spinners'
import Layout from '../Layout'

export default function Loading() {
  return (
    <Layout>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <BarLoader  color='#FFF'/>
        </div>
    </Layout>
  )
}
