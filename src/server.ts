import express from 'express'
import cors from 'cors'
import { router as exercisesRouter } from './routes/exercises'
import { router as dayRouter } from './routes/day'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/exercises', exercisesRouter)
app.use('/days', dayRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(process.env.PORT || 3333, () => console.log('server online'))
