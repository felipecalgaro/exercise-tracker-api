import express from 'express'
import { AppDataSource } from '../database/data-source'
import { Day } from '../entity/Day'
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

router.post('/exercises', async (req, res) => {
  const { name } = req.body.exercise
  const { weight, repetitions, date } = req.body.day

  try {
    await AppDataSource.initialize()

    const day = new Day()
    if (date) day.date = date
    day.repetitions = repetitions
    day.weight = weight
    await AppDataSource.manager.save(day)
    console.log(day);

    const exercise = new Exercise()
    exercise.name = name
    const daysArray = exercise.days || []
    daysArray.push(day)
    exercise.days = daysArray
    await AppDataSource.manager.save(exercise)

    const exercises = await AppDataSource.manager.find(Exercise, { relations: { days: true } })

    res.json(exercises)
  } catch (err) {
    res.status(400)
    console.log(err)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }