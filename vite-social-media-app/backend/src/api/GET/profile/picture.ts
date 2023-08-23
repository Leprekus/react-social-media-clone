import { type Request, type Response } from 'express'
import { UserProfileImage } from '../../../Tables'


export default async function handler(req: Request, res: Response) {

    const username = req.query.username




    let userProfileImage = null
    try {
        userProfileImage = await UserProfileImage.getOne().where('username').equals(username).run()
        
    }
    catch(error){
        console.log(error)
        userProfileImage = null
    }
    
    if(!userProfileImage)
       return res.status(404).json({ message: 'Not Found' })
            
   
    return res.status(200).json({ profileImage: userProfileImage.image })
  
}