import { type Request, type Response } from 'express'
import { UserProfileImage } from '../../../../Tables'


export default async function handler(req: Request, res: Response) {

    const reqSegments = req.path.split('/')
    const userId = reqSegments[reqSegments.length - 2]




    let userProfileImage = null
    try {
        userProfileImage = await UserProfileImage.getOne().where('id').equals(userId).run()
        
    }
    catch(error){
        console.log(error)
        userProfileImage = null
    }
    
    if(!userProfileImage)
       return res.status(404).json({ message: 'Not Found' })
            
   
    return res.status(200).json({ profileImage: userProfileImage.image })
  
}