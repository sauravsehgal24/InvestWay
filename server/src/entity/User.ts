import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

@Entity({ name: "user" })
export default class User{
    @PrimaryGeneratedColumn("uuid")
        userId: string;
    @Column()
        _id;
    @Column({
        nullable: false,
    })
    personalSettings: Object;

    @Column({
    nullable: false,
    })
    qsProfile: Object;
}
