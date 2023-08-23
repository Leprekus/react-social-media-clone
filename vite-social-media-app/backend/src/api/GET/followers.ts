import { type Request, type Response } from 'express'
import { UserTable } from '../../Tables'


export default async function handler(req: Request, res: Response) {

    const id = req.query.id
    
    let followers = null
    try {
        const user = await UserTable.getOne().where('id').equals(id).run()
        followers = user?.followers?.map(async (followerId) => 
        await UserTable.getOne().where('id').equals(followerId).run()
        )
        
        if(followers)
            followers = await Promise.all(followers)
    }
    catch(error){
        console.log(error)
        followers = null
    }   
    
    if(!followers)
        return res.status(200).json({ followers: [] })

    return res.status(200).json({ followers })
  
}