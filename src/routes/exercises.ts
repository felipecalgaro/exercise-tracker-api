import express from 'express'
import { AppDataSource } from '../data-source'
import { Exercise } from '../entity/Exercise'

const router = express.Router()

router.use(express.json())

router.get('/exercises', async (req, res) => {
  try {
    await AppDataSource.initialize()

    const exercises = await AppDataSource.manager.find(Exercise, {
      relations: {
        days: true
      }
    })

    res.json(exercises)
  } catch (err) {
    res.status(400)
    console.log(err)
  } finally {
    await AppDataSource.destroy()
  }
})

router.get('/exercises/:id', async (req, res) => {
  const { id } = req.params

  try {
    await AppDataSource.initialize()

    const exercise = await AppDataSource.manager.find(Exercise, {
      relations: {
        days: true
      },
      where: {
        id
      }
    })

    res.json(exercise)
  } catch (err) {
    res.status(400)
    console.log(err)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }