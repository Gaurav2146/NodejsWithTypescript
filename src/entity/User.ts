import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn , DeleteDateColumn, OneToOne, JoinColumn} from "typeorm"

import {Profile} from "./Profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}

