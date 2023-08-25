import express, { NextFunction } from 'express'
import cors, { CorsOptions } from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
const app = express()
const cookieParser = require('cookie-parser')
import { config } from 'dotenv'

config()

const allowedOrigins = [
    'https://fcbb-2604-3d08-367e-fc00-81d1-6825-a3a4-708a.ngrok-free.app',
    'http://localhost:5173'
  ];
  
  // Configure CORS to allow multiple origins
  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
    
        callback(null, true);
      } else {
        console.log({ origin })
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods:['PUT', 'GET', 'POST', 'DEL'],
  };
  
// app.use(cors({
//     origin: process.env.ORIGIN_URL,
//     credentials: true,
// }))

app.use(cors(corsOptions))

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