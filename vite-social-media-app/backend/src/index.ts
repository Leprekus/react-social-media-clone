import express from 'express'

const PORT = 4321
const app = express()

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})