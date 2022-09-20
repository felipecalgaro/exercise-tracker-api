import express from 'express'

const router = express.Router()

router.use(express.json())

router.get('/exercises', (req, res) => {
  res.send('hello from exercises')
})

export { router }