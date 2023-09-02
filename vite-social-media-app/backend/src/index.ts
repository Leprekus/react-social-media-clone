import express, { NextFunction } from 'express'
import cors from 'cors'
import body from './utils/parse-body'
import handleRequest from './utils/request-handler'
import * as http from 'http'
const cookieParser = require('cookie-parser')
import WebSocket from 'ws'
import { config } from 'dotenv'

config()

//WebSocket Server
const app = express()

const ws_PORT = 80
const server = http.createServer(app)
const wss = new WebSocket.Server({ server, perMessageDeflate: false })

// wss.on('connection', (socket) => {

//     console.log('user connected')

//     socket.on('message', (data) => {
//          wss.clients.forEach(client => {
//             if(client !== socket && client.readyState === WebSocket.OPEN) {
//                 //sender
                
//                 const stringified = data.toString()
//                 console.log({ stringified })
//                 client.send(stringified)
//             }
//          })
//         })

//     socket.on('close', () => { console.log('user disconnected') })
// })
// Function to send a heartbeat message to clients
interface Ws extends WebSocket { isAlive?: boolean }
function sendHeartbeat(ws: Ws) {
    if (ws.isAlive === false) {
      console.log('Terminating connection due to no response to heartbeat.');
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  }
  
  wss.on('connection', (ws:Ws ) => {
    console.log('Client connected');
  
    // Set up a heartbeat check
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  
    // Handle incoming messages
    ws.on('message', (message) => {

        // Handle the message as needed
        const stringified = message.toString()

      console.log('Received:', message, stringified);
  
      // Example: Send a response back
      ws.send(stringified);
    });
  
    // Handle WebSocket errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  
    // Handle WebSocket closures
    ws.on('close', (code, reason) => {
      console.log('Client disconnected:', code, { reason: reason.toString() }, reason);
    });
  });


// Periodically send heartbeat messages to all clients
setInterval(() => {
    wss.clients.forEach((ws) => {
      sendHeartbeat(ws);
    });
  }, 30000); // Adjust the interval as needed


server.listen(ws_PORT, () => {
    console.log(`Websocket listening on Port: ${ws_PORT}`)
})

//WebSocket Server

app.use(cors({
    origin: ['https://react-social-media-clone-one.vercel.app', 'https://momento-client-leprekus.vercel.app', 'http://localhost:5173', ],

    methods: ["GET","HEAD","OPTIONS","POST","PUT"],
    optionsSuccessStatus: 200,
    allowedHeaders : [
    'Authorization', 
    'Access-Control-Allow-Origin',
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