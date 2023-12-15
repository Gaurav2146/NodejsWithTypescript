import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn , DeleteDateColumn, JoinColumn, ManyToOne} from "typeorm"
import {Student} from "./Student";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Student,(student) => student.id)
    @JoinColumn()
    student: Student

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}


