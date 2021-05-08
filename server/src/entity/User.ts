import { truncate } from "fs/promises";
import {
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

enum Role {
    VIEWER = "Viewer",
    USER = "User",
}

class QsProfileData {}

class QsSettings {
    @Column({})
    maxGenre: number;
    @Column({})
    maxEquity: number;
    @Column({})
    genreVal: number;
    @Column({})
    equityVal: number;
    @Column({})
    dCombineVal: number;
    @Column({})
    genreCount: number;
    @Column({})
    equityCount: number;
    @Column({})
    dVal: number;
}

class AccountSettings {
    @Column({
        type: "varchar",
        length: 150,
        nullable: false,
    })
    name: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    password: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    address: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    phone: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    profileIcon: string;

    @Column({ nullable: true })
    qsSettings: QsSettings;
}

@Entity({ name: "user" })
export default class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;
    @ObjectIdColumn()
    _id: ObjectID;
    @Column({
        nullable: false,
    })
    accountSettings: AccountSettings;

    @Column({
        length: 150,
        nullable: false,
        unique: false,
    })
    role: Role;

    @Column({
        nullable: false,
        unique: false,
    })
    isActivated: boolean;

    @Column({
        nullable: true,
    })
    qsProfileData: QsProfileData;
}
