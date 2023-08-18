import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import cookieParser from 'cookie-parser'
import handleRequest from './utils/request-handler'
const PORT = 4321
const app = express()

app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
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