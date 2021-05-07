import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

enum Role{
    VIEWER="Viewer",
    USER="User"
}

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
        type:"varchar",
        length:150,
        nullable: false,
        unique:true,
    })
    email:string

    @Column({
        type:"varchar",
        length:150,
        nullable: false,
        unique:false,
    })
    password:string

    @Column({
        length:150,
        nullable: false,
        unique:false,
    })
    role:Role

    @Column({
        nullable: false,
        unique:false,
    })
    isActivated:boolean

    @Column({
    nullable: false,
    })
    qsProfile: Object;
}
