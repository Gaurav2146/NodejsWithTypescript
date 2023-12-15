import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn , DeleteDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm"
import {Subject} from "./Subject";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Subject,(subject)=>subject.id,{
        cascade:true,
        eager:true
    })
    subject: Subject[]

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}



