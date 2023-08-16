import type { Request, Response, NextFunction } from 'express'
export default function body(req: Request, res: Response, next: NextFunction) {

    if(req.method !== 'POST' || req.method !== 'POST')
        return next()

    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    }) 

    req.on('end', () => {
        try {
            const parsedData = JSON.parse(data)
            req.body = parsedData
            next()
            
        } catch(error) {

            next(error)
        } 
    })

    
}