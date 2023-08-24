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
app.use((req, res, next) => {
    console.log({ origin: process.env.ORIGIN_URL, reqUrl: req.headers.origin })
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL!);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
    
});

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