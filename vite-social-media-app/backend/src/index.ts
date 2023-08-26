import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
const app = express()
const cookieParser = require('cookie-parser')
import { config } from 'dotenv'

config()
  
app.use(cors({
    origin: 'https://3316-2604-3d08-367e-fc00-81d1-6825-a3a4-708a.ngrok-free.app',
    credentials: true,
}))

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log({ path: req.path})
  return next()
})
app.use(cookieParser())

app.use(body)

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