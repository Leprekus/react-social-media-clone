import { type Request, type Response } from 'express'
import { PostsBucket } from '../../Tables'


export default async function handler(req: Request, res: Response) {

    const id = req.query.id
    
    let post = null
    try {
        post = await PostsBucket.getOne().where('id').equals(id).run()
    }
    catch(error){
        console.log(error)
        post = null
    }   
    
    if(!post)
        return res.status(200).json({ posts: [] })

    return res.status(200).json({ post })
  
}