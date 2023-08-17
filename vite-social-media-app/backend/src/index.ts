import express, { NextFunction } from 'express'
import cors from 'cors'
import path from 'path'
import body from './utils/parse-body'
import cookieParser from 'cookie-parser'
const PORT = 4321
const app = express()

app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use(body)

app.post('/api/POST/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
    const filePath = path.join(__dirname, req.path)
   
    try {

        const module = await import(filePath)

        const handler = await module.default || await module.handler

        const response: Response = await handler(req, res, next)

        return response


    } catch(Error) {

        console.log(`Error at handler: ${req.path} Error: ${Error}`)
        
        return res.status(500).json({ Error: 'Internal server error '})

    }


    
})
app.get('/api/GET/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
    const split = req.path.split('?')
    const reqPath = split[0] 
    const queryString = split.slice(1, split.length)
    const fileName = reqPath.split('/')
    req.query = { [fileName[fileName.length - 1]]: queryString }

    const filePath = path.join(__dirname, reqPath)
    try {

        const module = await import(filePath)

        const handler = await module.default || await module.handler

        const response: Response = await handler(req, res, next)

        return response


    } catch(Error) {

        console.log(`Error at handler: ${req.path} Error: ${Error}`)
        
        return res.status(500).json({ Error: 'Internal server error '})

    }


    
})



  
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})