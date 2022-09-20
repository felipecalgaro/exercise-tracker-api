import "reflect-metadata"
import { DataSource } from "typeorm"
import { Day } from "./entity/Day"
import { Exercise } from "./entity/Exercise"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pipe260806",
    database: "exercise_tracker",
    synchronize: true,
    logging: false,
    entities: ['src/entity'],
    migrations: ['src/migration'],
    subscribers: [],
})
