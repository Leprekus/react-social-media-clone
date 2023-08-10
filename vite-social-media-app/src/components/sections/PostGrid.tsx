import user from '../../../mock/user.json'
import PostPreview from '../PostPreview'
export default function PostGrid() {
    const Posts = new Array(user.posts).fill({ 
        like_count: Math.floor(Math.random() * 1000), 
        comment_count: Math.floor(Math.random() * 500),
        image: 'https://t4.ftcdn.net/jpg/05/72/82/85/360_F_572828530_ofzCYowQVnlOwkcoBJnZqT36klbJzWdn.jpg',
        id:  Math.floor(Math.random() * 500)
    })
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5'>
        {Posts.map((post, i) => 
            <PostPreview
                post={post}
                key={i}
            />
        )}
    </div>
  )
}
