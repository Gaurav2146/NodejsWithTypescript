import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn , DeleteDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm"
import {Subject} from "./Subject";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    //eager:true can be used on only one side of the table only
    @OneToMany(() => Subject,(subject)=>subject.id,{
        cascade:true,
    })
    subject: Subject[]

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}



