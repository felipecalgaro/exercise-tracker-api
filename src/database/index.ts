import { AppDataSource } from "./data-source"
import { Day } from "../entity/Day"
import { Exercise } from "../entity/Exercise"

AppDataSource.initialize()
    .then(async () => {
        const day1 = new Day()
        day1.repetitions = 12
        day1.weight = 8
        await AppDataSource.manager.save(day1)

        const day2 = new Day()
        day2.repetitions = 16
        day2.weight = 6
        await AppDataSource.manager.save(day2)

        const exercise = new Exercise()
        exercise.name = "Bench Press"
        exercise.days = [day1, day2]
        await AppDataSource.manager.save(exercise)

        console.log("Loading exercises from the database...")
        const exercises = await AppDataSource.manager.find(Exercise, { relations: { days: true } })
        console.log("Loaded exercises: ", exercises)
    })
    .catch(error => console.log(error))
