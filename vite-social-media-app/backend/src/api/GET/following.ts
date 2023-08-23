import { type Request, type Response } from 'express'
import { UserTable } from '../../Tables'


export default async function handler(req: Request, res: Response) {

    const id = req.query.id
    
    let following = null
    try {
        const user = await UserTable.getOne().where('id').equals(id).run()
        following = user?.following?.map(async (followingId) => 
        await UserTable.getOne().where('id').equals(followingId).run()
        )
        console.log({ following})
        
    }
    catch(error){
        console.log(error)
        following = null
    }   
    
    if(!following)
        return res.status(200).json({ following: [] })

    return res.status(200).json({ following })
  
}