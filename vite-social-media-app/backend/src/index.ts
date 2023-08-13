import express from 'express'
import cors from 'cors'
import path from 'path'
import body from './utils/parse-body'
const PORT = 4321
const app = express()


app.use(cors())

app.use(body)

app.post('/api/POST/*', async (req: express.Request, res:express.Response) => {
    
    const filePath = path.join(__dirname, req.path)
   
    try {

        const module = await import(filePath)

        const handler = await module.default || await module.handler

        const response: Response = await handler(req, res)

        return response


    } catch(Error) {

        console.log({ Error })
        
        return res.status(500).json({ Error: 'Internal server error '})

    }


    
})



  
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})