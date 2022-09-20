import express from 'express'
import { router as exercisesRouter } from './routes/exercises'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/', exercisesRouter)

app.listen(process.env.PORT || 3333, () => console.log('server online'))
