import express from 'express'
import { AppDataSource } from '../database/data-source'
import { Day } from '../entity/Day'
import { Exercise } from '../entity/Exercise'

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
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

router.get('/:name', async (req, res) => {
  const { name } = req.params

  try {
    await AppDataSource.initialize()

    const exercise = await AppDataSource.manager.findOne(Exercise, {
      relations: {
        days: true
      },
      where: {
        name
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

router.post('/', async (req, res) => {
  const { name } = req.body.exercise
  const { weight, repetitions, date } = req.body.day

  try {
    await AppDataSource.initialize()

    const day = new Day()
    if (date) day.date = date // remove when developing client side
    day.repetitions = repetitions
    day.weight = weight
    await AppDataSource.manager.save(day)

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

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await AppDataSource.initialize()

    await AppDataSource.manager.delete(Exercise, {
      id
    })

    const exercises = await AppDataSource.manager.find(Exercise, { relations: { days: true } })

    res.json(exercises)
  } catch (error) {
    console.log(error)
    res.status(400)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }