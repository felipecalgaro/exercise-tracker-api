import express from 'express'
import cors from 'cors'
import { router as exercisesRouter } from './routes/exercises'
import { router as dayRouter } from './routes/day'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/', exercisesRouter)
app.use('/', dayRouter)

app.listen(process.env.PORT || 3333, () => console.log('server online'))
