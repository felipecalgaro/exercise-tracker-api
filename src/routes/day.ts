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
    res.status(400)
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
})

router.put('/day/:id', async (req, res) => {
  const { id } = req.params
  const { date, weight, repetitions } = req.body

  try {
    await AppDataSource.initialize()

    const day = await AppDataSource.manager.findOne(Day, {
      where: {
        id
      }
    })

    if (date) day.date = date
    if (repetitions) day.repetitions = repetitions
    if (weight) day.weight = weight
    await AppDataSource.manager.save(day)
    res.send(day)
  } catch (error) {
    res.status(400)
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }