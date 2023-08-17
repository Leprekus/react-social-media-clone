import { type Request, type Response } from 'express'
import { PostsBucket } from '../../Tables'


export default async function handler(req: Request, res: Response) {

    const { post } = req.query
    const [ queryString ] = (post as string)
    const id = queryString.slice(3)
    
    const postData = await PostsBucket.getOne().where('id').equals(id).run()
    
    if(!postData)
        return res.status(200).json({ posts: [] })

    //const sortedPosts = sort(posts as IPost[])
    return res.status(200).json({ post: postData })
  
}