import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
const app = express()
const cookieParser = require('cookie-parser')
import { config } from 'dotenv'

config()

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

// Add this middleware to set the CORS headers explicitly.
app.options('*', cors());

app.use(body)
app.use(cookieParser())





app.put('/api/PUT/*', async (req: express.Request, res:express.Response, next: NextFunction) => {

    handleRequest(req, res, next)
    
})
app.post('/api/POST/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
    handleRequest(req, res, next)
    
})
app.get('/api/GET/*', async (req: express.Request, res:express.Response, next: NextFunction) => {

   handleRequest(req, res, next)

})



  
app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})