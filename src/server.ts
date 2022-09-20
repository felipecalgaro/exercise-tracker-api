import express from 'express'
import { router as exercisesRouter } from './routes/exercises'
import { router as dayRouter } from './routes/day'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/', exercisesRouter)
app.use('/', dayRouter)

app.listen(process.env.PORT || 3333, () => console.log('server online'))
