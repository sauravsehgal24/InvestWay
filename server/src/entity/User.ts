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

class QsAccount {
    @Column({})
    type: string;
    @Column({})
    number: number;
    @Column({})
    status: string;
    @Column({})
    isPrimary: boolean;
    @Column({})
    isBilling: boolean;
    @Column({})
    clientAccountType: string;
}

class QsProfileData {
    @Column({})
    accounts: Array<QsAccount>;

    @Column({})
    positions: Array<any>;

    @Column({})
    executions: Array<any>;

    @Column({})
    orders: Array<any>;
}

export class TokenData {
    @Column({})
    access_token: string;
    @Column({})
    refresh_token: string;
    @Column({})
    expires_in: number;
    @Column({})
    api_server: string;
    @Column({})
    token_type: string;
}

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
    athTkn: string;

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
        nullable: false,
    })
    tokenData: TokenData;

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
