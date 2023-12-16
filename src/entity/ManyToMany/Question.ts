import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    DeleteDateColumn,
} from "typeorm"
import { Category } from "./Category "

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    //By default @ManyToMany has lazy loading. In order to make it eager, you have to SET eager option to true.
    @ManyToMany(() => Category, (category) => category.questions, {
        cascade: true, 
        eager: true,
    })
    @JoinTable()
    categories: Category[]

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}
