import express from 'express'
import cors from 'cors'

const PORT = 4321
const app = express()


app.use(cors())
app.get('/api', (req: express.Request, res:express.Response) => {
    res.json({ message: 'hello world '})
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})