import express from 'express'
import cors from 'cors'
import path from 'path'
const PORT = 4321
const app = express()


app.use(cors())
app.get('/api', async (req: express.Request, res:express.Response) => {
    
    const filePath = path.join(__dirname, '/sdf', req.path)
   
    try {

        const module = await import(filePath)

        const handler = await module.default || await module.handler
        
        const response: Response = await handler(req, res)

        return response


    } catch(Error) {

        return res.status(500).json({ Error })

    }


    
})



  
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})