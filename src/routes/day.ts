import express from 'express'
import { AppDataSource } from '../database/data-source'
import { Day } from '../entity/Day'
import { Exercise } from '../entity/Exercise'

const router = express.Router()

router.use(express.json())

router.post('/day/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params
  const { weight, repetitions, date } = req.body

  try {
    await AppDataSource.initialize()

    const day = new Day()
    day.weight = weight
    day.repetitions = repetitions
    if (date) day.date = date // remove when developing client side
    await AppDataSource.manager.save(day)

    const exercise = await AppDataSource.manager.findOne(Exercise, {
      relations: {
        days: true
      },
      where: {
        id: exerciseId
      }
    })

    exercise.days.push(day)
    await AppDataSource.manager.save(exercise)

    res.send(exercise)
  } catch (error) {
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }