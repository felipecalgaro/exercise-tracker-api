import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Day } from "./Day"

@Entity()
export class Exercise {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Day, (day) => day.exercise)
    days: Day[]

}
