import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Exercise } from "./Exercise"

@Entity()
export class Day {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  weight: number

  @Column()
  repetitions: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Exercise, (exercise) => exercise.days)
  exercise: Exercise
}