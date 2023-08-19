import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
const PORT = 4321
const app = express()
const cookieParser = require('cookie-parser')
import { config } from 'dotenv'
config()
app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

app.use(body)

app.post('/api/POST/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
    handleRequest(req, res, next)
    
})
app.get('/api/GET/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
   handleRequest(req, res, next)

})



  
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})