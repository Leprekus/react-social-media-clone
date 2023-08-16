
import { IPost } from '../../../typings'
import Post from '../../components/Post'

export default function Home() {
  
    const samplePost:IPost = {
        author: 'JohnDeer',
        author_image: '',
        comment_count: 356,
        comments: Array(356).fill('the comment'),
        like_count: 954,
        likes: Array(954).fill('user_id'),
        image: [''],
        id: Math.floor(Math.random() * 9999).toString(),
        description: 'The quick brown fox jumped over the lazy dog.'
    }

  return (
    <div>
      <Post post={samplePost}/>
    </div>
  )
}
