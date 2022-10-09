import express from 'express'
import { AppDataSource } from '../database/data-source'
import { Day } from '../entity/Day'
import { Exercise } from '../entity/Exercise'

const router = express.Router()

router.use(express.json())

router.post('/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params
  const { weight, repetitions, date } = req.body

  try {
    await AppDataSource.initialize()

    const day = new Day()
    day.weight = weight
    day.repetitions = repetitions
    day.date = date
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

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { weight, repetitions } = req.body

  try {
    await AppDataSource.initialize()

    const day = await AppDataSource.manager.findOne(Day, {
      where: {
        id
      }
    })

    if (repetitions) day.repetitions = repetitions
    if (weight) day.weight = weight
    await AppDataSource.manager.save(day)
    res.json(day)
  } catch (error) {
    res.status(400)
  } finally {
    await AppDataSource.destroy()
  }
})

router.delete('/:exerciseId/:id', async (req, res) => {
  const { id, exerciseId } = req.params

  try {
    await AppDataSource.initialize()

    await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Day)
      .where("id = :id", { id })
      .execute()

    const exercise = await AppDataSource.manager.findOne(Exercise, {
      where: {
        id: exerciseId
      },
      relations: {
        days: true
      }
    })

    res.json(exercise)
  } catch (error) {
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
})

export { router }