import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string

    @Column({nullable:false , default:"PROFILE IMAGE"})
    photo: string
}


