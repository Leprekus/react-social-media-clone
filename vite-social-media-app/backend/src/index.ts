import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
const app = express()
const cookieParser = require('cookie-parser')
import { config } from 'dotenv'

config()


app.use(cors({
    origin: ['https://react-social-media-clone-one.vercel.app', 'https://momento-client-leprekus.vercel.app', 'http://localhost:5173', ],

    methods: ["GET,HEAD,OPTIONS,POST,PUT"],
    optionsSuccessStatus: 200,
    allowedHeaders : [
    'Authorization', 
   // 'Access-Control-Allow-Origin',
    "Access-Control-Allow-Headers",
    "Origin",
    "Accept",
     "X-Requested-With",
    "Content-Type", 
    "Access-Control-Request-Method", 
    "Access-Control-Request-Headers", 
    'access-control-allow-credentials',
    "ngrok-skip-browser-warning"
],
    credentials: true,


}))

app.use(cookieParser())

app.use(body)

app.put('/api/PUT/*', async (req: express.Request, res:express.Response, next: NextFunction) => {

    await handleRequest(req, res, next)
    
})
app.post('/api/POST/*', async (req: express.Request, res:express.Response, next: NextFunction) => {
    
    await handleRequest(req, res, next)
    
})
app.get('/api/GET/*', async (req: express.Request, res:express.Response, next: NextFunction) => {

  
   await handleRequest(req, res, next)

})



  
app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})